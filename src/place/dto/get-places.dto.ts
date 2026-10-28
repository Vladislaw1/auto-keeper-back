import { Transform, Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { PlaceCategory } from '../../../generated/prisma/client';

export function toCategoryArray(value: unknown): PlaceCategory[] | undefined {
  if (value == null || value === '') {
    return undefined;
  }

  const list = Array.isArray(value) ? value : String(value).split(',');
  const categories = list.map((item) => String(item).trim()).filter(Boolean);
  return categories.length ? (categories as PlaceCategory[]) : undefined;
}

export class GetPlacesDto {
  @Type(() => Number)
  @IsNumber()
  @Min(-90)
  @Max(90)
  south!: number;

  @Type(() => Number)
  @IsNumber()
  @Min(-180)
  @Max(180)
  west!: number;

  @Type(() => Number)
  @IsNumber()
  @Min(-90)
  @Max(90)
  north!: number;

  @Type(() => Number)
  @IsNumber()
  @Min(-180)
  @Max(180)
  east!: number;

  @IsOptional()
  @Transform(({ value }) => toCategoryArray(value))
  @IsEnum(PlaceCategory, { each: true })
  category?: PlaceCategory[];
}
