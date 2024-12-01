/*
  Warnings:

  - The `role` column on the `invitation` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `address` on the `organization` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `organization` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `organization` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `organization` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `organization` table. All the data in the column will be lost.
  - You are about to drop the column `floorCount` on the `organization` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `organization` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `organization` table. All the data in the column will be lost.
  - You are about to drop the column `zipCode` on the `organization` table. All the data in the column will be lost.
  - You are about to drop the column `activeOrganizationId` on the `session` table. All the data in the column will be lost.
  - The `role` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `status` on the `invitation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `role` on the `member` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `room` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "userRole" AS ENUM ('admin', 'member', 'owner', 'user');

-- CreateEnum
CREATE TYPE "roomType" AS ENUM ('STANDARD', 'DELUXE', 'SUITE', 'PRESIDENTIAL');

-- CreateEnum
CREATE TYPE "invitationStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'EXPIRED');

-- AlterTable
ALTER TABLE "invitation" DROP COLUMN "role",
ADD COLUMN     "role" "userRole",
DROP COLUMN "status",
ADD COLUMN     "status" "invitationStatus" NOT NULL;

-- AlterTable
ALTER TABLE "member" DROP COLUMN "role",
ADD COLUMN     "role" "userRole" NOT NULL;

-- AlterTable
ALTER TABLE "organization" DROP COLUMN "address",
DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "description",
DROP COLUMN "email",
DROP COLUMN "floorCount",
DROP COLUMN "phone",
DROP COLUMN "website",
DROP COLUMN "zipCode",
ALTER COLUMN "slug" DROP NOT NULL;

-- AlterTable
ALTER TABLE "room" DROP COLUMN "type",
ADD COLUMN     "type" "roomType" NOT NULL;

-- AlterTable
ALTER TABLE "session" DROP COLUMN "activeOrganizationId",
ADD COLUMN     "activeorganizationId" TEXT;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "role",
ADD COLUMN     "role" "userRole" NOT NULL DEFAULT 'user';

-- DropEnum
DROP TYPE "InvitationStatus";

-- DropEnum
DROP TYPE "RoomType";

-- DropEnum
DROP TYPE "UserRole";
