/*
  Warnings:

  - You are about to drop the column `name` on the `cars` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `cars` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[vin]` on the table `cars` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[car_number]` on the table `cars` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `brand` to the `cars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `car_number` to the `cars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color` to the `cars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `engineVolume` to the `cars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fuelType` to the `cars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `model` to the `cars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transmission` to the `cars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `cars` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `year` on the `cars` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "FuelType" AS ENUM ('PETROL', 'DIESEL', 'HYBRID', 'ELECTRIC', 'GAS');

-- CreateEnum
CREATE TYPE "Transmission" AS ENUM ('MANUAL', 'AUTOMATIC');

-- AlterTable
ALTER TABLE "cars" DROP COLUMN "name",
DROP COLUMN "number",
ADD COLUMN     "brand" TEXT NOT NULL,
ADD COLUMN     "car_number" TEXT NOT NULL,
ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "engineCode" TEXT,
ADD COLUMN     "engineVolume" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "fuelType" "FuelType" NOT NULL,
ADD COLUMN     "mileage" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "model" TEXT NOT NULL,
ADD COLUMN     "transmission" "Transmission" NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "vin" TEXT,
DROP COLUMN "year",
ADD COLUMN     "year" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "cars_vin_key" ON "cars"("vin");

-- CreateIndex
CREATE UNIQUE INDEX "cars_car_number_key" ON "cars"("car_number");
