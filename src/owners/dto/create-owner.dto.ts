import { IsString, MinLength } from 'class-validator';

export class CreateOwnerDto {
    @IsString()
    @MinLength(1)
    first_name!: string;

    @IsString()
    @MinLength(1)
    last_name!: string;
}
