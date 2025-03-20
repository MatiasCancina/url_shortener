import validator from "validator";

export const validateUrlMiddleware = (req, res, next) => {
    console.log("📌 Middleware de validación ejecutándose..."); // 🔍 Log para verificar si entra aquí

    const { originalUrl } = req.body;

    if (!originalUrl || !validator.isURL(originalUrl)) {
        console.log("❌ URL inválida detectada:", originalUrl); // 🔍 Log de error
        return res.status(400).json({ error: "URL inválida" });
    }

    console.log("✅ URL válida:", originalUrl); // 🔍 Log de éxito
    next();
};
