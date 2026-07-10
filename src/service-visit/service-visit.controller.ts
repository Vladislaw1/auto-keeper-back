import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import {ServiceVisitService} from "./service-visit.service";
import {CreateServiceVisitDto} from "./dto/create-service-visit.dto";

@Controller('service-visit')
export class ServiceVisitController {
    constructor(private readonly serviceVisitService: ServiceVisitService) {}

    @Post()
    create(@Body() dto: CreateServiceVisitDto){
        return this.serviceVisitService.createServiceVisit(dto)
    }

    @Get()
    findByCar(@Query('carId') carId: string){
        return this.serviceVisitService.findByCar(carId)
    }

    @Get(':id')
    findOne(@Query('id') id: string){
        return this.serviceVisitService.findOne(id)
    }

    @Put('id')
    update(@Param('id') id: string, @Body() dto: CreateServiceVisitDto){
        return this.serviceVisitService.update(id,dto)
    }

    @Delete(':id')
    remove(@Param('id') id: string){
        return this.serviceVisitService.remove(id)
    }
}
