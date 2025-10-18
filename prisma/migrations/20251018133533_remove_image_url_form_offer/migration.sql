/*
  Warnings:

  - You are about to drop the column `currency` on the `Offer` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Offer` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Offer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Offer" DROP COLUMN "currency",
DROP COLUMN "imageUrl",
DROP COLUMN "location",
ADD COLUMN     "originalPrice" DOUBLE PRECISION,
ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "OfferReview" (
    "id" SERIAL NOT NULL,
    "offerId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OfferReview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "OfferReview_offerId_idx" ON "OfferReview"("offerId");

-- CreateIndex
CREATE INDEX "OfferReview_userId_idx" ON "OfferReview"("userId");

-- CreateIndex
CREATE INDEX "OfferImage_offerId_idx" ON "OfferImage"("offerId");

-- AddForeignKey
ALTER TABLE "OfferReview" ADD CONSTRAINT "OfferReview_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferReview" ADD CONSTRAINT "OfferReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferImage" ADD CONSTRAINT "OfferImage_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
