import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import urlRoutes from "./routes/urlRoutes.js";
import { requestLoggerMiddleware } from "./middlewares/requestLogger.js";
import { errorHandlerMiddleware } from "./middlewares/errorHandler.js";
import { cleanupExpiredUrls } from "./middlewares/cleanupExpiredUrls.js";
import { limiter } from "./middlewares/rateLimit.js";
import session from "express-session";
import passport from "passport";
import "./middlewares/auth.js";
import { isAuthenticated } from "./middlewares/auth.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLoggerMiddleware);
app.use(cleanupExpiredUrls);
app.use("/api/urls/shorten", limiter);

// Configurar sesión
app.use(
    session({
        secret: "supersecreto",
        resave: false,
        saveUninitialized: true,
    })
);

// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());

// Rutas de autenticación con Google
app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        res.redirect("/dashboard"); // Redirigir al usuario logueado
    }
);

app.get("/logout", (req, res) => {
    req.logout(() => {
        res.redirect("/");
    });
});

app.get("/dashboard", isAuthenticated, (req, res) => {
    res.json({ message: "Bienvenido al Dashboard", user: req.user });
});

// Rutas
app.use("/api/urls", urlRoutes);

// Middleware de manejo de errores (Siempre al final)
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✨ Servidor corriendo en http://localhost:${PORT}`);
});
