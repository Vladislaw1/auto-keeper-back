import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import { OwnersService } from './owners.service';

@Controller('owners')
export class OwnersController {
  constructor(private readonly ownersService: OwnersService) {}

  @Get('/:id')
    getOwner(@Param('id') id: string){
      return this.ownersService.getOwner(id)
    }

  @Post('create')
    createOwner(@Body('first_name') first_name: string,@Body('last_name') last_name: string){
      return this.ownersService.createOwner(first_name,last_name)
    }
}
