import { Module } from '@nestjs/common';
import { ServiceVisitController } from './service-visit.controller';
import { ServiceVisitService } from './service-visit.service';

@Module({
  controllers: [ServiceVisitController],
  providers: [ServiceVisitService]
})

export class ServiceVisitModule {}
