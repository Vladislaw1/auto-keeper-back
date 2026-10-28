import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PlaceService } from './place.service';
import { GetPlacesDto } from './dto/get-places.dto';
import { NearbyPlacesDto } from './dto/nearby-places.dto';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('places')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Get()
  findInBounds(@Query() dto: GetPlacesDto) {
    return this.placeService.findInBounds(dto);
  }

  @Get('nearby')
  findNearby(@Query() dto: NearbyPlacesDto) {
    return this.placeService.findNearby(dto);
  }

  @Get(':id/reviews')
  getReviews(@Param('id') id: string) {
    return this.placeService.getReviews(id);
  }

  @Post(':id/reviews')
  addReview(@Param('id') id: string, @Body() dto: CreateReviewDto) {
    // Замінимо на користувача з гарда авторизації
    const userId = 'TODO';
    return this.placeService.addReview(id, userId, dto.rating, dto.text);
  }
}
