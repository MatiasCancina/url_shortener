import validator from "validator";
const blockedDomains = ["phishing.com", "scam-site.net", "malware.xyz"];

export const validateUrlMiddleware = (req, res, next) => {
    console.log("📌 Middleware de validación ejecutándose..."); // 🔍 Log para verificar si entra aquí

    const { originalUrl } = req.body;

    if (!originalUrl || !validator.isURL(originalUrl)) {
        console.log("❌ URL inválida detectada:", originalUrl); // 🔍 Log de error
        return res.status(400).json({ error: "URL inválida" });
    }

    // Extraer dominio
    const hostname = new URL(originalUrl).hostname;
    if (blockedDomains.includes(hostname)) {
        console.warn(`🚨 Bloqueando intento de acortar URL prohibida: ${hostname}`);
        return res.status(403).json({ error: "Este dominio está bloqueado por seguridad." });
    }

    console.log(`✅ URL válida: ${originalUrl}`); next();
    next();
};
