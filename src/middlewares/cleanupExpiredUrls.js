import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const cleanupExpiredUrls = async (_req, _res, next) => {
    try {
        console.log("🧹 Eliminando URLs expiradas...");

        const now = new Date();
        const deletedUrls = await prisma.shortenedUrl.deleteMany({
            where: {
                expiresAt: { lte: now } // Menor o igual a la fecha actual
            }
        });

        console.log(`🗑️ URLs eliminadas: ${deletedUrls.count}`);
    } catch (error) {
        console.error("❌ Error al limpiar URLs expiradas:", error);
    }

    next();
};
