import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateServiceVisitDto } from './create-service-visit.dto';

export class UpdateServiceVisitDto extends PartialType(
    OmitType(CreateServiceVisitDto, ['carId', 'items'] as const),
) {}