import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {Car} from "../generated/prisma/client";
import {randomUUID} from "node:crypto";

@Injectable()
export class AppService {
  constructor( private prisma: PrismaService) {}
}
