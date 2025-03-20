import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";

const prisma = new PrismaClient();

/**
 * Acorta una URL y la guarda en la base de datos.
 */
export const shortenUrl = async (req, res) => {
    try {
        const { originalUrl, expiresIn } = req.body;

        if (!originalUrl) {
            return res.status(400).json({ error: "La URL original es obligatoria" });
        }

        // Generar un código único de 6 caracteres
        let shortCode;
        let exists;
        do {
            shortCode = nanoid(6);
            exists = await prisma.shortenedUrl.findUnique({ where: { shortCode } });
        } while (exists);

        // Calcular fecha de expiración si se envía
        let expiresAt = null;
        if (expiresIn) {
            expiresAt = new Date();
            expiresAt.setSeconds(expiresAt.getSeconds() + expiresIn);
        }

        // Guardar en la base de datos
        const newUrl = await prisma.shortenedUrl.create({
            data: {
                originalUrl,
                shortCode,
                expiresAt,
            },
        });
        const baseUrl = process.env.BASE_URL || "http://localhost:5000";

        res.json({
            message: "URL acortada con éxito",
            shortUrl: `${baseUrl}/${newUrl.shortCode}`,
        });
    } catch (error) {
        console.error("Error al acortar la URL:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

/**
 * Busca una URL en la base de datos y redirige a la original.
 */
export const getUrl = async (req, res) => {
    try {
        const { shortCode } = req.params;

        const urlEntry = await prisma.shortenedUrl.findUnique({
            where: { shortCode },
        });

        if (!urlEntry) {
            return res.status(404).json({ error: "URL no encontrada" });
        }

        // Verificar si la URL ha expirado
        if (urlEntry.expiresAt && new Date() > urlEntry.expiresAt) {
            return res.status(410).json({ error: "Esta URL ha expirado" });
        }

        // Incrementar contador de visitas
        await prisma.shortenedUrl.update({
            where: { shortCode },
            data: { visits: urlEntry.visits + 1 },
        });

        res.json({ originalUrl: urlEntry.originalUrl });
    } catch (error) {
        console.error("Error al obtener la URL:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
