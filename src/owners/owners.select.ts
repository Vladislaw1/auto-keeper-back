import { Prisma } from '../../generated/prisma/client';

export const ownerListSelect = {
    id: true,
    first_name: true,
    last_name: true,
} as const;

export const ownerWithCarsSelect = {
    id: true,
    first_name: true,
    last_name: true,
    cars: {
        select: {
            id: true,
            brand: true,
            model: true,
            year: true,
            color: true,
            vin: true,
            carNumber: true,
        },
    },
} as const;

export type OwnerListItem = Prisma.OwnerGetPayload<{
    select: typeof ownerListSelect;
}>;

export type OwnerWithCars = Prisma.OwnerGetPayload<{
    select: typeof ownerWithCarsSelect;
}>;
