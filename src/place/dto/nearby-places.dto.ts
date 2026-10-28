import { Transform, Type } from 'class-transformer';
import { IsEnum, IsInt, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { PlaceCategory } from '../../../generated/prisma/client';
import { toCategoryArray } from './get-places.dto';

export class NearbyPlacesDto {
  @Type(() => Number)
  @IsNumber()
  @Min(-90)
  @Max(90)
  lat!: number;

  @Type(() => Number)
  @IsNumber()
  @Min(-180)
  @Max(180)
  lon!: number;

  @Type(() => Number)
  @IsInt()
  @Min(100)
  @Max(50000)
  radius: number = 5000;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number = 20;

  @IsOptional()
  @Transform(({ value }) => toCategoryArray(value))
  @IsEnum(PlaceCategory, { each: true })
  category?: PlaceCategory[];
}
