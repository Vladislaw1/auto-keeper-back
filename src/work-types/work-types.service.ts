import { BadRequestException, Injectable } from '@nestjs/common';
import { WorkCategory } from '../../generated/prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { workTypeSelect } from './work-types.select';

const WORK_CATEGORIES = new Set<string>(Object.values(WorkCategory));

@Injectable()
export class WorkTypesService {
    constructor(private prisma: PrismaService) {}

    findAll(category?: string) {
        if (category && !WORK_CATEGORIES.has(category)) {
            throw new BadRequestException('Невірна категорія робіт');
        }

        return this.prisma.workType.findMany({
            where: {
                isActive: true,
                ...(category ? { category: category as WorkCategory } : {}),
            },
            select: workTypeSelect,
            orderBy: [{ category: 'asc' }, { name: 'asc' }],
        });
    }
}
