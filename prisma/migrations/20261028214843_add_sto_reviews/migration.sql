-- CreateExtension
CREATE EXTENSION IF NOT EXISTS postgis;

-- CreateTable
CREATE TABLE "Sto" (
    "id" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lon" DOUBLE PRECISION NOT NULL,
    "name" TEXT,
    "phone" TEXT,
    "hours" TEXT,
    "website" TEXT,
    "address" TEXT,
    "ratingAvg" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "ratingCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Sto_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "Sto" ADD COLUMN "location" geography(Point,4326) GENERATED ALWAYS AS (ST_SetSRID(ST_MakePoint("lon","lat"),4326)::geography) STORED;
CREATE INDEX "Sto_location_gist" ON "Sto" USING GIST ("location");

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "stoId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "text" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Sto_lat_lon_idx" ON "Sto"("lat", "lon");

-- CreateIndex
CREATE INDEX "Review_stoId_idx" ON "Review"("stoId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_stoId_userId_key" ON "Review"("stoId", "userId");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_stoId_fkey" FOREIGN KEY ("stoId") REFERENCES "Sto"("id") ON DELETE CASCADE ON UPDATE CASCADE;
