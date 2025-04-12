/*
  Warnings:

  - You are about to drop the column `deliverd_at` on the `Bag` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Bag" DROP COLUMN "deliverd_at",
ADD COLUMN     "delivered_at" TIMESTAMP(3),
ADD COLUMN     "is_delivered" BOOLEAN NOT NULL DEFAULT false;
