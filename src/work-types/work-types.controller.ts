import { Controller, Get, Query } from '@nestjs/common';
import { WorkTypesService } from './work-types.service';

@Controller('work-types')
export class WorkTypesController {
    constructor(private readonly workTypesService: WorkTypesService) {}

    @Get()
    findAll(@Query('category') category?: string) {
        return this.workTypesService.findAll(category);
    }
}
