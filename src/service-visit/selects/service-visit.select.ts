import {Prisma} from "../../../generated/prisma/client";

export const serviceVisitSelect = {
    id: true,
    carId: true,
    date: true,
    mileage: true,
    totalCost: true,
    notes: true,
    createAt: true,
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
            },
        },
    },
} as const;

export type ServiceVisitWithItems = Prisma.ServiceVisitGetPayload<{
    select: typeof serviceVisitSelect;
}>;