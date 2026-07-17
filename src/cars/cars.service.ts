import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../../prisma/prisma.service";
import {CreateCarDto, UpdateCarDto} from "./cars.dto";
import {CarWithOwner, carWithOwnerSelect} from "./cars.select";
import {CloudinaryService} from "../cloudinary/cloudinary.service";



@Injectable()
export class CarsService {
    constructor(private prisma: PrismaService,private cloudinaryService: CloudinaryService) {}

    getCars(): Promise<CarWithOwner[]> {
        return this.prisma.car.findMany({
            select: carWithOwnerSelect
        });
    }

    async createCar(
        dto: CreateCarDto,
        files?: { photo?: Express.Multer.File[]; photos?: Express.Multer.File[] },
    ): Promise<CarWithOwner> {
        const { ownerId, ...carData } = dto;
        const car = await this.prisma.car.create({
            data: {
                ...carData,
                owner: { connect: { id: ownerId } },
            },
        });
        const allFiles = [...(files?.photo ?? []), ...(files?.photos ?? [])];
        for (let i = 0; i < allFiles.length; i++) {
            const file = allFiles[i];
            const result = await this.cloudinaryService.uploadImage(file, `cars/${car.id}`);
            await this.prisma.carPhoto.create({
                data: {
                    url: result.secure_url,
                    publicId: result.public_id,
                    isMain: i === 0,
                    carId: car.id,
                },
            });
        }
        return this.prisma.car.findUniqueOrThrow({
            where: { id: car.id },
            select: carWithOwnerSelect,
        });
    }

    updateCar(id: string, carData: UpdateCarDto): Promise<CarWithOwner> {
        return this.prisma.car.update({
            where: { id },
            data: { ...carData },
            select: carWithOwnerSelect,
        });
    }
    async deleteCar(id: string) {
        const car = await this.prisma.car.findUnique({
            where: { id },
            include: { photos: true },
        });
        if (!car) throw new NotFoundException('Car not found');

        for (const photo of car.photos) {
            await this.cloudinaryService.deleteImage(photo.publicId);
        }

        await this.prisma.$transaction(async (tx) => {
            await tx.serviceItem.deleteMany({
                where: { visit: { carId: id } },
            });
            await tx.serviceVisit.deleteMany({
                where: { carId: id },
            });
            await tx.car.delete({ where: { id } });
        });

        return car;
    }

    async uploadPhoto(carId: string, file: Express.Multer.File) {
        const car = await this.prisma.car.findUnique({
            where: { id: carId },
            include: { photos: true },
        });
        if (!car) throw new NotFoundException('Car not found');
        const result = await this.cloudinaryService.uploadImage(file, `cars/${carId}`);
        return this.prisma.carPhoto.create({
            data: {
                url: result.secure_url,
                publicId: result.public_id,
                isMain: car.photos.length === 0, // перше фото — головне
                carId,
            },
            select: {
                id: true,
                url: true,
                publicId: true,
                isMain: true,
                carId: true,
            },
        });
    }
}
