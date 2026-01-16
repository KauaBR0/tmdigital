import { Lead } from '../lead.entity';
import { CreateLeadDto } from '../dto/create-lead.dto';
import { UpdateLeadDto } from '../dto/update-lead.dto';
import { PaginationDto } from '../../../common/dto/pagination.dto';

export interface ILeadsRepository {
  create(createLeadDto: CreateLeadDto): Promise<Lead>;
  findAll(
    paginationDto: PaginationDto,
  ): Promise<{ data: any[]; total: number }>;
  findOne(id: number): Promise<Lead | null>;
  update(id: number, updateLeadDto: UpdateLeadDto): Promise<Lead | null>;
  remove(id: number): Promise<void>;
  preload(entityLike: any): Promise<Lead | undefined>; // Helper for update if needed or handle internal
}
