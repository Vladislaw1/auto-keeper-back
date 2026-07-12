import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { OwnersService } from './owners.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';

@Controller('owners')
export class OwnersController {
    constructor(private readonly ownersService: OwnersService) {}

    @Get()
    getOwners() {
        return this.ownersService.getOwners();
    }

    @Get(':id')
    async getOwner(@Param('id') id: string) {
        const owner = await this.ownersService.getOwner(id);
        if (!owner) {
            throw new NotFoundException('Власника не знайдено');
        }
        return owner;
    }

    @Post('create')
    createOwner(@Body() dto: CreateOwnerDto) {
        return this.ownersService.createOwner(dto);
    }

    @Put(':id')
    updateOwner(@Param('id') id: string, @Body() dto: UpdateOwnerDto) {
        return this.ownersService.updateOwner(id, dto);
    }

    @Delete(':id')
    deleteOwner(@Param('id') id: string) {
        return this.ownersService.deleteOwner(id);
    }
}
