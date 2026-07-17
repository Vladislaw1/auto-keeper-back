import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import {
    ownerListSelect,
    OwnerListItem,
    ownerWithCarsSelect,
    OwnerWithCars,
} from './owners.select';

@Injectable()
export class OwnersService {
    constructor(private prisma: PrismaService) {}

    getOwners(): Promise<OwnerListItem[]> {
        return this.prisma.owner.findMany({
            select: ownerWithCarsSelect,
            orderBy: [{ last_name: 'asc' }, { first_name: 'asc' }],
        });
    }

    getOwner(id: string): Promise<OwnerWithCars | null> {
        return this.prisma.owner.findUnique({
            where: { id },
            select: ownerWithCarsSelect,
        });
    }

    createOwner(dto: CreateOwnerDto): Promise<OwnerListItem> {
        return this.prisma.owner.create({
            data: {
                first_name: dto.first_name,
                last_name: dto.last_name,
            },
            select: ownerListSelect,
        });
    }

    updateOwner(id: string, dto: UpdateOwnerDto): Promise<OwnerListItem> {
        return this.prisma.owner.update({
            where: { id },
            data: dto,
            select: ownerListSelect,
        });
    }

    async deleteOwner(id: string) {
        await this.prisma.owner.delete({ where: { id } });
        return { deleted: true };
    }
}
