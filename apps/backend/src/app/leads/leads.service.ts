import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { ILeadsRepository } from './repositories/lead.repository.interface';
import { Lead } from './lead.entity';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class LeadsService {
  constructor(
    @Inject('ILeadsRepository')
    private readonly leadsRepository: ILeadsRepository,
  ) {}

  async create(createLeadDto: CreateLeadDto): Promise<Lead> {
    return this.leadsRepository.create(createLeadDto);
  }

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<{ data: any[]; total: number }> {
    return this.leadsRepository.findAll(paginationDto);
  }

  async findOne(id: number): Promise<Lead> {
    const lead = await this.leadsRepository.findOne(id);
    if (!lead) {
      throw new NotFoundException(`Lead #${id} not found`);
    }
    return lead;
  }

  async update(id: number, updateLeadDto: UpdateLeadDto): Promise<Lead> {
    const lead = await this.leadsRepository.update(id, updateLeadDto);
    if (!lead) {
      throw new NotFoundException(`Lead #${id} not found`);
    }
    return lead;
  }

  async remove(id: number): Promise<void> {
    const lead = await this.leadsRepository.findOne(id);
    if (!lead) {
      throw new NotFoundException(`Lead #${id} not found`);
    }
    await this.leadsRepository.remove(id);
  }
}
