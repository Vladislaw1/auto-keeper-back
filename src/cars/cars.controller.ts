import {
  Body,
  Controller,
  Delete, FileTypeValidator,
  Get, MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Put,
  UploadedFile, UploadedFiles,
  UseInterceptors
} from '@nestjs/common';
import { CarsService } from './cars.service';
import {CreateCarDto, UpdateCarDto} from "./cars.dto";
import {FileFieldsInterceptor, FileInterceptor} from "@nestjs/platform-express";

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  getCars() {
    return this.carsService.getCars();
  }

  @Post('create')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'photo', maxCount: 1 },      // одне головне фото
    { name: 'photos', maxCount: 10 },    // або кілька фото
  ]))
  createCar(
      @Body() dto: CreateCarDto,
      @UploadedFiles()
      files: { photo?: Express.Multer.File[]; photos?: Express.Multer.File[] },
  ) {
    return this.carsService.createCar(dto, files);
  }

  @Put('/:id')
  updateCar(@Param('id') id: string, @Body() dto: UpdateCarDto){
    return this.carsService.updateCar(id, dto)
  }

  @Delete('remove/:id')
  deleteCar(@Param('id') id: string){
    return this.carsService.deleteCar(id)
  }

  @Post(':id/photos')
  @UseInterceptors(FileInterceptor('photo'))
  uploadPhoto(
      @Param('id') carId: string,
      @UploadedFile(
          new ParseFilePipe({
            validators: [
              new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB
              new FileTypeValidator({ fileType: /^image\/(jpeg|png|webp)$/ }),
            ],
          }),
      )
      file: Express.Multer.File,
  ) {
    return this.carsService.uploadPhoto(carId, file);
  }
}
