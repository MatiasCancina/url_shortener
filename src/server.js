import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import urlRoutes from "./routes/urlRoutes.js";
import { requestLoggerMiddleware } from "./middlewares/requestLogger.js";
import { errorHandlerMiddleware } from "./middlewares/errorHandler.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLoggerMiddleware);

// Rutas
app.use("/api/urls", urlRoutes);

// Middleware de manejo de errores (Siempre al final)
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
