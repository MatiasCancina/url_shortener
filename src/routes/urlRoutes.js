import express from "express";
import { shortenUrl, getUrl, getUrlStats } from "../controllers/urlController.js";
import { validateUrlMiddleware } from "../middlewares/validateUrl.js";

const router = express.Router();

// Acorta una URL y la guarda en la base de datos
router.post("/shorten", validateUrlMiddleware, shortenUrl);

// Redirige a la URL original basada en el shortCode
router.get("/:shortCode", getUrl);

// Estadísticas de una URL
router.get("/:shortCode/stats", getUrlStats);

export default router;
