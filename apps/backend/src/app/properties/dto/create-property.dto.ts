import { IsNumber, IsEnum, IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { CropType } from '../property.entity';

export class CreatePropertyDto {
  @IsEnum(CropType)
  crop: CropType;

  @IsNumber()
  area: number;

  @IsString()
  @IsOptional()
  geometry?: string;

  @IsNumber()
  @IsNotEmpty()
  leadId: number;
}
