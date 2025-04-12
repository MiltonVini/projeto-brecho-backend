/*
  Warnings:

  - Added the required column `email` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Made the column `instagram_name` on table `clients` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "clients" ADD COLUMN     "email" TEXT NOT NULL,
ALTER COLUMN "instagram_name" SET NOT NULL;
