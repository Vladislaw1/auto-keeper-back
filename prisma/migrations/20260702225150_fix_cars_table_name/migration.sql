/*
  Warnings:

  - You are about to drop the column `car_number` on the `cars` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[carNumber]` on the table `cars` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `carNumber` to the `cars` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "cars_car_number_key";

-- AlterTable
ALTER TABLE "cars" DROP COLUMN "car_number",
ADD COLUMN     "carNumber" TEXT NOT NULL,
ALTER COLUMN "color" DROP NOT NULL,
ALTER COLUMN "transmission" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "cars_carNumber_key" ON "cars"("carNumber");

-- CreateIndex
CREATE INDEX "cars_owner_id_idx" ON "cars"("owner_id");
