import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../prisma/prisma.service";

@Injectable()
export class OwnersService {

    constructor(private prisma: PrismaService) {}

    getOwner(id: string){
        return this.prisma.owner.findUnique({
            where:{id},
            select: {
                id: true,
                first_name: true,
                last_name: true,
                cars: {
                    select: {
                        id: true,
                        brand: true,
                        model: true,
                        year: true,
                        color: true,
                        mileage: true,
                        fuelType: true,
                        transmission: true,
                        engineCode: true,
                        engineVolume: true,
                        vin: true,
                        carNumber: true,
                    },
                },
            },
        });
    }

    createOwner(first_name: string,last_name: string){
        return this.prisma.owner.create({
            data: {
                first_name: first_name,
                last_name: last_name,
            }
        });
    }
}
