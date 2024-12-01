/*
  Warnings:

  - The `role` column on the `invitation` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `metadata` column on the `organization` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `role` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `status` on the `invitation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `role` on the `member` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `address` to the `organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `floorCount` to the `organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipCode` to the `organization` table without a default value. This is not possible if the table is not empty.
  - Made the column `slug` on table `organization` required. This step will fail if there are existing NULL values in that column.
  - Made the column `banned` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('OWNER', 'ADMIN', 'STAFF');

-- CreateEnum
CREATE TYPE "RoomType" AS ENUM ('STANDARD', 'DELUXE', 'SUITE', 'PRESIDENTIAL');

-- CreateEnum
CREATE TYPE "InvitationStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'EXPIRED');

-- AlterTable
ALTER TABLE "invitation" DROP COLUMN "role",
ADD COLUMN     "role" "UserRole",
DROP COLUMN "status",
ADD COLUMN     "status" "InvitationStatus" NOT NULL;

-- AlterTable
ALTER TABLE "member" DROP COLUMN "role",
ADD COLUMN     "role" "UserRole" NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "organization" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "floorCount" INTEGER NOT NULL,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "website" TEXT,
ADD COLUMN     "zipCode" TEXT NOT NULL,
ALTER COLUMN "slug" SET NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "metadata",
ADD COLUMN     "metadata" JSONB;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "role",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'STAFF',
ALTER COLUMN "banned" SET NOT NULL,
ALTER COLUMN "banned" SET DEFAULT false;

-- CreateTable
CREATE TABLE "room" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "roomNumber" TEXT NOT NULL,
    "type" "RoomType" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "room_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "room_organizationId_roomNumber_key" ON "room"("organizationId", "roomNumber");

-- AddForeignKey
ALTER TABLE "room" ADD CONSTRAINT "room_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
