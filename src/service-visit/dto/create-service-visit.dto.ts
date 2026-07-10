import {
    ArrayMinSize,
    IsArray,
    IsDateString,
    IsInt,
    IsNumber,
    IsOptional,
    IsString,
    IsUUID,
    Min,
    ValidateNested
} from "class-validator";
import {Type} from "class-transformer";

export class CreateServiceItemDto {
    @IsUUID()
    workTypeId!: string;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    price?: number;

    @IsOptional()
    @IsString()
    note?: string;
}

export class CreateServiceVisitDto {
    @IsUUID()
    carId!: string;

    @IsDateString()
    date!: string

    @Type(() => Number)
    @IsInt()
    @Min(0)
    mileage!: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    totalCost?: number;

    @IsOptional()
    @IsString()
    notes?: string;

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => CreateServiceItemDto)
    items!: CreateServiceItemDto[];
}