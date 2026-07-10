-- CreateTable
CREATE TABLE "car_photos" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "isMain" BOOLEAN NOT NULL DEFAULT false,
    "car_id" TEXT NOT NULL,

    CONSTRAINT "car_photos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "car_photos_car_id_idx" ON "car_photos"("car_id");

-- AddForeignKey
ALTER TABLE "car_photos" ADD CONSTRAINT "car_photos_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE CASCADE ON UPDATE CASCADE;
