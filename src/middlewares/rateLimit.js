import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 10, // Máximo de 10 peticiones por IP en 15 minutos
    message: { error: "Has excedido el límite de peticiones. Intenta más tarde." },
    standardHeaders: true,
    legacyHeaders: false
});
