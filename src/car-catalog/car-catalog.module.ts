import { Module } from '@nestjs/common';
import { CarCatalogService } from './car-catalog.service';
import { CarCatalogController } from './car-catalog.controller';
@Module({
  controllers: [CarCatalogController],
  providers: [CarCatalogService],
})
export class CarCatalogModule {}