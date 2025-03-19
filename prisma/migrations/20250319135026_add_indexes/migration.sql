-- CreateTable
CREATE TABLE "ShortenedUrl" (
    "id" TEXT NOT NULL,
    "originalUrl" TEXT NOT NULL,
    "shortCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),
    "visits" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ShortenedUrl_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ShortenedUrl_originalUrl_key" ON "ShortenedUrl"("originalUrl");

-- CreateIndex
CREATE UNIQUE INDEX "ShortenedUrl_shortCode_key" ON "ShortenedUrl"("shortCode");

-- CreateIndex
CREATE INDEX "ShortenedUrl_expiresAt_idx" ON "ShortenedUrl"("expiresAt");
