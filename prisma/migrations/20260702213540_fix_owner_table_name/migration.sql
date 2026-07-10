/*
  Warnings:

  - You are about to drop the column `second_name` on the `owners` table. All the data in the column will be lost.
  - Added the required column `last_name` to the `owners` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "owners" DROP COLUMN "second_name",
ADD COLUMN     "last_name" TEXT NOT NULL;
