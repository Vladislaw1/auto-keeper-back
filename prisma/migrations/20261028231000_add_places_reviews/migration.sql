-- CreateExtension
CREATE EXTENSION IF NOT EXISTS postgis;

-- CreateEnum
CREATE TYPE "PlaceCategory" AS ENUM ('CAR_REPAIR', 'TYRES', 'CAR_WASH', 'CAR_PARTS');

-- DropTable
DROP TABLE "Review";

-- DropTable
DROP TABLE "Sto";

-- CreateTable
CREATE TABLE "Place" (
    "id" TEXT NOT NULL,
    "category" "PlaceCategory" NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lon" DOUBLE PRECISION NOT NULL,
    "name" TEXT,
    "phone" TEXT,
    "hours" TEXT,
    "website" TEXT,
    "address" TEXT,
    "tags" JSONB,
    "ratingAvg" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "ratingCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Place_pkey" PRIMARY KEY ("id")
);

-- Create generated location
ALTER TABLE "Place" ADD COLUMN "location" geography(Point,4326) GENERATED ALWAYS AS (ST_SetSRID(ST_MakePoint("lon","lat"),4326)::geography) STORED;

CREATE INDEX "Place_location_gist" ON "Place" USING GIST ("location");

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "placeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "text" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Place_category_idx" ON "Place"("category");

-- CreateIndex
CREATE INDEX "Place_lat_lon_idx" ON "Place"("lat", "lon");

-- CreateIndex
CREATE INDEX "Review_placeId_idx" ON "Review"("placeId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_placeId_userId_key" ON "Review"("placeId", "userId");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE CASCADE ON UPDATE CASCADE;
