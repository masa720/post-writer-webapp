/*
  Warnings:

  - You are about to drop the column `access_Token` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `refresh_Token` on the `accounts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[provider,providerAccountId]` on the table `accounts` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."accounts_providerId_providerAccountId_key";

-- AlterTable
ALTER TABLE "public"."accounts" DROP COLUMN "access_Token",
DROP COLUMN "refresh_Token",
ADD COLUMN     "access_token" TEXT,
ADD COLUMN     "refresh_token" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_providerAccountId_key" ON "public"."accounts"("provider", "providerAccountId");
