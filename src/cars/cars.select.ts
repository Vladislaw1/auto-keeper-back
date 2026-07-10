import {Prisma} from "../../generated/prisma/client";

export const carWithOwnerSelect = {
    id: true,
    brand: true,
    model: true,
    year: true,
    color: true,
    mileage: true,
    fuelType: true,
    transmission: true,
    engineCode: true,
    engineVolume: true,
    vin: true,
    carNumber: true,
    createdAt: true,
    updatedAt: true,
    owner: {
        select: {
            id: true,
            first_name: true,
            last_name: true,
        },
    },
    photos: {
        select: {
            id: true,
            url: true,
            isMain: true,
        },
    },
    serviceVisits: {
        select: {
            id: true,
            date: true,
            mileage: true,
            totalCost: true,
            notes: true,
            items: {
                select: {
                    id: true,
                    price: true,
                    note: true,
                    workType: {
                        select: {
                            id: true,
                            name: true,
                            category: true,
                        },
                    }
                }
            }
        }
    }
} as const;

export type CarWithOwner = Prisma.CarGetPayload<{
    select: typeof carWithOwnerSelect;
}>;