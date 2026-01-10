import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from './lead.entity';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';

@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(Lead)
    private readonly leadRepository: Repository<Lead>,
  ) {}

  async create(createLeadDto: CreateLeadDto): Promise<Lead> {
    const lead = this.leadRepository.create(createLeadDto);
    return this.leadRepository.save(lead);
  }

  async findAll(): Promise<any[]> {
    const leads = await this.leadRepository.find({
      relations: ['properties'],
    });
    return leads.map((lead) => ({
      ...lead,
      isPriority: lead.properties.some((p) => p.area > 100),
    }));
  }

  async findOne(id: number): Promise<Lead> {
    const lead = await this.leadRepository.findOneBy({ id });
    if (!lead) {
      throw new NotFoundException(`Lead #${id} not found`);
    }
    return lead;
  }

  async update(id: number, updateLeadDto: UpdateLeadDto): Promise<Lead> {
    const lead = await this.leadRepository.preload({
      id: id,
      ...updateLeadDto,
    });
    if (!lead) {
      throw new NotFoundException(`Lead #${id} not found`);
    }
    return this.leadRepository.save(lead);
  }

  async remove(id: number): Promise<void> {
    const lead = await this.findOne(id);
    await this.leadRepository.remove(lead);
  }
}