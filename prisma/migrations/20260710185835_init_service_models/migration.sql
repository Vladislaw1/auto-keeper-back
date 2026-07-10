/*
  Warnings:

  - You are about to drop the column `description` on the `ServiceItem` table. All the data in the column will be lost.
  - You are about to drop the column `serviceVisitId` on the `ServiceItem` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[visitId,workTypeId]` on the table `ServiceItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `visitId` to the `ServiceItem` table without a default value. This is not possible if the table is not empty.
  - Made the column `workTypeId` on table `ServiceItem` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ServiceItem" DROP CONSTRAINT "ServiceItem_serviceVisitId_fkey";

-- DropForeignKey
ALTER TABLE "ServiceItem" DROP CONSTRAINT "ServiceItem_workTypeId_fkey";

-- AlterTable
ALTER TABLE "ServiceItem" DROP COLUMN "description",
DROP COLUMN "serviceVisitId",
ADD COLUMN     "note" TEXT,
ADD COLUMN     "visitId" TEXT NOT NULL,
ALTER COLUMN "workTypeId" SET NOT NULL,
ADD CONSTRAINT "ServiceItem_pkey" PRIMARY KEY ("id");

-- DropIndex
DROP INDEX "ServiceItem_id_key";

-- AlterTable
ALTER TABLE "WorkType" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX "ServiceItem_visitId_workTypeId_key" ON "ServiceItem"("visitId", "workTypeId");

-- AddForeignKey
ALTER TABLE "ServiceItem" ADD CONSTRAINT "ServiceItem_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "ServiceVisit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceItem" ADD CONSTRAINT "ServiceItem_workTypeId_fkey" FOREIGN KEY ("workTypeId") REFERENCES "WorkType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
