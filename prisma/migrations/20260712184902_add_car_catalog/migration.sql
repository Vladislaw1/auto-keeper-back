-- CreateTable
CREATE TABLE "car_brands" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "car_brands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "car_models" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brand_id" TEXT NOT NULL,

    CONSTRAINT "car_models_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "car_brands_name_key" ON "car_brands"("name");

-- CreateIndex
CREATE INDEX "car_models_brand_id_idx" ON "car_models"("brand_id");

-- CreateIndex
CREATE UNIQUE INDEX "car_models_brand_id_name_key" ON "car_models"("brand_id", "name");

-- AddForeignKey
ALTER TABLE "car_models" ADD CONSTRAINT "car_models_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "car_brands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
