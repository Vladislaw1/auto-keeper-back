import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CarCatalogService {
    constructor(private prisma: PrismaService) {}
    getBrands() {
        return this.prisma.carBrand.findMany({
            select: { id: true, name: true },
            orderBy: { name: 'asc' },
        });
    }
    getModelsByBrand(brandId: string) {
        return this.prisma.carModel.findMany({
            where: { brandId },
            select: { id: true, name: true },
            orderBy: { name: 'asc' },
        });
    }
}