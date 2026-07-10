 import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
 import {PrismaService} from "../prisma/prisma.service";
 import {ConfigModule} from "@nestjs/config";
import { CarsModule } from './cars/cars.module';
import { OwnersModule } from './owners/owners.module';
 import {CarsService} from "./cars/cars.service";
 import {OwnersService} from "./owners/owners.service";
 import {CarsController} from "./cars/cars.controller";
 import {OwnersController} from "./owners/owners.controller";
 import {PrismaModule} from "../prisma/prisma.module";
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ServiceVisitModule } from './service-visit/service-visit.module';

@Module({
  imports: [
      ConfigModule.forRoot({
          isGlobal: true,
      }),
      PrismaModule,
      CarsModule,
      OwnersModule,
      CloudinaryModule,
      ServiceVisitModule,
  ],
  controllers: [AppController,CarsController,OwnersController],
  providers: [AppService,CarsService,OwnersService,PrismaService],
})
export class AppModule {}
