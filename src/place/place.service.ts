import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { GetPlacesDto } from './dto/get-places.dto';
import { NearbyPlacesDto } from './dto/nearby-places.dto';

type NearbyPlaceRow = {
  id: string;
  category: string;
  lat: number;
  lon: number;
  name: string | null;
  phone: string | null;
  hours: string | null;
  website: string | null;
  address: string | null;
  ratingAvg: number;
  ratingCount: number;
  distance: number;
};

@Injectable()
export class PlaceService {
  constructor(private readonly prisma: PrismaService) {}

  findInBounds(dto: GetPlacesDto) {
    return this.prisma.place.findMany({
      where: {
        lat: { gte: dto.south, lte: dto.north },
        lon: { gte: dto.west, lte: dto.east },
        ...(dto.category?.length ? { category: { in: dto.category } } : {}),
      },
      take: 500,
      select: {
        id: true,
        category: true,
        lat: true,
        lon: true,
        name: true,
        phone: true,
        hours: true,
        website: true,
        address: true,
        ratingAvg: true,
        ratingCount: true,
      },
    });
  }

  findNearby(dto: NearbyPlacesDto) {
    const categoryFilter = dto.category?.length
      ? Prisma.sql`AND category::text IN (${Prisma.join(dto.category)})`
      : Prisma.empty;

    return this.prisma.$queryRaw<NearbyPlaceRow[]>`
      SELECT
        id,
        category::text AS category,
        lat,
        lon,
        name,
        phone,
        hours,
        website,
        address,
        "ratingAvg",
        "ratingCount",
        ST_Distance(
          location,
          ST_SetSRID(ST_MakePoint(${dto.lon}::float8, ${dto.lat}::float8), 4326)::geography
        ) AS distance
      FROM "Place"
      WHERE ST_DWithin(
        location,
        ST_SetSRID(ST_MakePoint(${dto.lon}::float8, ${dto.lat}::float8), 4326)::geography,
        ${dto.radius}::float8
      )
      ${categoryFilter}
      ORDER BY location <-> ST_SetSRID(ST_MakePoint(${dto.lon}::float8, ${dto.lat}::float8), 4326)::geography
      LIMIT ${dto.limit}::int
    `;
  }

  getReviews(placeId: string) {
    return this.prisma.review.findMany({
      where: { placeId },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  }

  addReview(placeId: string, userId: string, rating: number, text?: string) {
    return this.prisma.$transaction(async (tx) => {
      const place = await tx.place.findUnique({ where: { id: placeId } });
      if (!place) {
        throw new NotFoundException();
      }

      await tx.review.upsert({
        where: { placeId_userId: { placeId, userId } },
        create: { placeId, userId, rating, text },
        update: { rating, text },
      });

      const stats = await tx.review.aggregate({
        where: { placeId },
        _avg: { rating: true },
        _count: { rating: true },
      });

      return tx.place.update({
        where: { id: placeId },
        data: {
          ratingAvg: stats._avg.rating ?? 0,
          ratingCount: stats._count.rating,
        },
      });
    });
  }
}
