import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CarsModule } from './cars/cars.module';
import { OwnersModule } from './owners/owners.module';
import { PrismaModule } from '../prisma/prisma.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ServiceVisitModule } from './service-visit/service-visit.module';
import { CarCatalogModule } from './car-catalog/car-catalog.module';

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
      CarCatalogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
