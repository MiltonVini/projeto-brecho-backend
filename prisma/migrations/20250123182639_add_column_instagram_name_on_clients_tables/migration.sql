/*
  Warnings:

  - Added the required column `instagram_name` to the `clients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clients" ADD COLUMN     "instagram_name" TEXT NOT NULL;
