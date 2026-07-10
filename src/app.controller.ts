import {Body, Controller, Get, Post, Put, Param, Delete} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('cars')
export class AppController {
  constructor(private readonly appService: AppService) {}



}
