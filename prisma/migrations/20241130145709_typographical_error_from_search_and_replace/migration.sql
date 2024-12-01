/*
  Warnings:

  - You are about to drop the column `activeorganizationId` on the `session` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "session" DROP COLUMN "activeorganizationId",
ADD COLUMN     "activeOrganizationId" TEXT;
