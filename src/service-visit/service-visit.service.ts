import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../../prisma/prisma.service";
import {CreateServiceVisitDto} from "./dto/create-service-visit.dto";
import {serviceVisitSelect, ServiceVisitWithItems} from "./selects/service-visit.select";
import {UpdateServiceVisitDto} from "./dto/update-service-visit.dto";

@Injectable()
export class ServiceVisitService {
    constructor(private prisma: PrismaService) {}

    async createServiceVisit(dto: CreateServiceVisitDto): Promise<ServiceVisitWithItems> {
        const car = await this.prisma.car.findUnique({
            where:{id: dto.carId},
        })

        if(!car) throw new NotFoundException('Автомобіль не знайдено')

        const workTypeIds = dto.items.map(item => item.workTypeId)
        const uniqIds = [...new Set(workTypeIds)]

        if(uniqIds.length !== workTypeIds.length){
            throw new BadRequestException('Дублікат типів роботи в одному візиті')
        }

        const workTypes = await this.prisma.workType.findMany({
            where: {id: {in: uniqIds}, isActive: true},
        })

        if(workTypes.length !== workTypeIds.length){
            throw new BadRequestException('Деякі типи робіт не знайдені або неактивні')
        }

        const totalCost = dto.totalCost ?? dto.items.reduce((sum, item) => sum + (item.price ?? 0), 0)

        return this.prisma.serviceVisit.create({
            data: {
                carId: dto.carId,
                date: new Date(dto.date),
                mileage: dto.mileage,
                totalCost,
                notes: dto.notes,
                items:{
                    create: dto.items.map((item) => ({
                        workTypeId: item.workTypeId,
                        price: item.price,
                        note: item.note,
                    }))
                }
            },
            select: serviceVisitSelect
        })
    }

    findByCar(carId: string): Promise<ServiceVisitWithItems[]>{
        return this.prisma.serviceVisit.findMany({
            where: {carId},
            select: serviceVisitSelect,
            orderBy:{
                date: 'desc'
            }
        })
    }

    findOne(id: string): Promise<ServiceVisitWithItems>{
        return this.prisma.serviceVisit.findUniqueOrThrow({
            where: {id},
            select: serviceVisitSelect,
        })
    }

    update(id: string, dto: UpdateServiceVisitDto): Promise<ServiceVisitWithItems>{
        return this.prisma.serviceVisit.update({
            where:{id},
            data:{
                ...dto,
                ...(dto.date && {date: new Date(dto.date)})
            },
            select: serviceVisitSelect
        })
    }

    async remove(id: string){
        await this.prisma.serviceVisit.delete({where:{id}})
        return {deleted: true}
    }
}
