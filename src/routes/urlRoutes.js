import express from "express";
import { shortenUrl, getUrl } from "../controllers/urlController.js";

const router = express.Router();

// Acorta una URL y la guarda en la base de datos
router.post("/shorten", shortenUrl);

// Redirige a la URL original basada en el shortCode
router.get("/:shortCode", getUrl);

export default router;
