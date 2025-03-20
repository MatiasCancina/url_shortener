import axios from "axios";

export const verifyCaptcha = async (req, res, next) => {
    const { captchaToken } = req.body;
    if (!captchaToken) {
        return res.status(400).json({ error: "Falta el reCAPTCHA" });
    }

    try {
        const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
            params: {
                secret: process.env.RECAPTCHA_SECRET,
                response: captchaToken
            }
        });

        if (!response.data.success) {
            return res.status(403).json({ error: "reCAPTCHA no válido." });
        }

        console.log("✅ Usuario verificado con reCAPTCHA.");
        next();
    } catch (error) {
        console.error("❌ Error verificando reCAPTCHA:", error);
        return res.status(500).json({ error: "Error validando reCAPTCHA" });
    }
};
