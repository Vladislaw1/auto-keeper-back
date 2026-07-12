import { Controller, Get, Param } from '@nestjs/common';
import { CarCatalogService } from './car-catalog.service';
@Controller()
export class CarCatalogController {
    constructor(private readonly carCatalogService: CarCatalogService) {}
    @Get('brands')
    getBrands() {
        return this.carCatalogService.getBrands();
    }
    @Get('brands/:brandId/models')
    getModels(@Param('brandId') brandId: string) {
        return this.carCatalogService.getModelsByBrand(brandId);
    }
}