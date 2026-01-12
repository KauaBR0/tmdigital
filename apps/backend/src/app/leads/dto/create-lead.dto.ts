import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  Matches,
} from 'class-validator';
import { LeadStatus } from '../lead.entity';

export class CreateLeadDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  state?: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{11}$|^\d{3}\.\d{3}\.\d{3}-\d{2}$/, { message: 'CPF inválido' })
  cpf: string;

  @IsEnum(LeadStatus)
  @IsOptional()
  status?: LeadStatus;

  @IsString()
  @IsOptional()
  comments?: string;
}
