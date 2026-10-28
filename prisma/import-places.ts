import 'dotenv/config';
import { readFileSync } from 'node:fs';
import { PlaceCategory, Prisma, PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined');
}

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const CATEGORIES = new Set<string>(Object.values(PlaceCategory));

type PlaceRow = {
  id?: string;
  category?: string;
  lat?: number | null;
  lon?: number | null;
  name?: string | null;
  phone?: string | null;
  hours?: string | null;
  website?: string | null;
  address?: string | null;
  tags?: Prisma.InputJsonValue | null;
};

type PlaceInsert = {
  id: string;
  category: PlaceCategory;
  lat: number;
  lon: number;
  name: string | null;
  phone: string | null;
  hours: string | null;
  website: string | null;
  address: string | null;
  tags: Prisma.InputJsonValue | typeof Prisma.JsonNull;
};

const CHUNK = 1000;

function isPlaceCategory(value: string): value is PlaceCategory {
  return CATEGORIES.has(value);
}

function toInsert(row: PlaceRow): PlaceInsert | null {
  if (!row.id || row.lat == null || row.lon == null || !row.category || !isPlaceCategory(row.category)) {
    return null;
  }

  return {
    id: row.id,
    category: row.category,
    lat: row.lat,
    lon: row.lon,
    name: row.name ?? null,
    phone: row.phone ?? null,
    hours: row.hours ?? null,
    website: row.website ?? null,
    address: row.address ?? null,
    tags: row.tags == null ? Prisma.JsonNull : row.tags,
  };
}

async function main() {
  const rows = JSON.parse(readFileSync('./sto.json', 'utf8')) as PlaceRow[];
  const places: PlaceInsert[] = [];
  let skipped = 0;
  const byCategory: Record<string, number> = {};

  for (const row of rows) {
    const place = toInsert(row);
    if (!place) {
      skipped += 1;
      continue;
    }
    places.push(place);
    byCategory[place.category] = (byCategory[place.category] ?? 0) + 1;
  }

  let inserted = 0;
  for (let offset = 0; offset < places.length; offset += CHUNK) {
    const chunk = places.slice(offset, offset + CHUNK);
    const result = await prisma.place.createMany({
      data: chunk,
      skipDuplicates: true,
    });
    inserted += result.count;
    const done = Math.min(offset + CHUNK, places.length);
    console.log(`${done} / ${places.length}, inserted ${result.count}`);
  }

  console.log(`read ${rows.length}`);
  console.log(`skipped ${skipped}`);
  console.log(`inserted ${inserted}`);
  for (const category of Object.values(PlaceCategory)) {
    console.log(`${category}: ${byCategory[category] ?? 0}`);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
