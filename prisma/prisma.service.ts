import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import {PrismaClient} from "../generated/prisma/client";
import {PrismaPg} from "@prisma/adapter-pg";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    constructor() {
        console.log('DATABASE_URL =', process.env.DATABASE_URL);
        const adapter = new PrismaPg({
            connectionString: process.env.DATABASE_URL,
        });

        super({ adapter });
    }

    async onModuleInit() {
        await this.$connect();
    }

    enableShutdownHooks(app: INestApplication) {
        process.on('beforeExit', async () => {
            await app.close();
        });
    }
}