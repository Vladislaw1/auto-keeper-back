import { IsEnum, IsInt, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';
import {FuelType, Transmission} from "../../generated/prisma/enums";
import {OmitType, PartialType} from "@nestjs/mapped-types";
import {Type} from "class-transformer";

export class CreateCarDto {
    @IsString()
    brand!: string

    @IsString()
    model!: string;

    @Type(() => Number)
    @IsInt()
    @Min(1900)
    year!: number;

    @IsOptional()
    @IsString()
    color?: string;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    mileage?: number;

    @IsEnum(FuelType)
    fuelType!: FuelType;

    @IsOptional()
    @IsEnum(Transmission)
    transmission?: Transmission;

    @IsString()
    @IsOptional()
    engineCode?: string;

    @Type(() => Number)
    @IsNumber()
    engineVolume!: number;

    @IsString()
    @IsOptional()
    vin?: string;

    @IsString()
    carNumber!: string;  // або car_number, якщо залишите в schema

    @IsUUID()
    ownerId!: string;
}

export class UpdateCarDto extends PartialType(OmitType(CreateCarDto, ['ownerId'] as const),) {
}

