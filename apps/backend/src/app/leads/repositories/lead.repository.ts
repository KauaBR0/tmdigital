import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from '../lead.entity';
import { ILeadsRepository } from './lead.repository.interface.ts';
import { CreateLeadDto } from '../dto/create-lead.dto';
import { UpdateLeadDto } from '../dto/update-lead.dto';
import { PaginationDto } from '../../../common/dto/pagination.dto';

@Injectable()
export class LeadsRepository implements ILeadsRepository {
  constructor(
    @InjectRepository(Lead)
    private readonly typeOrmRepository: Repository<Lead>,
  ) {}

  async create(createLeadDto: CreateLeadDto): Promise<Lead> {
    const lead = this.typeOrmRepository.create(createLeadDto);
    return this.typeOrmRepository.save(lead);
  }

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<{ data: any[]; total: number }> {
    const {
      page = 1,
      limit = 10,
      sortBy,
      sortOrder = 'ASC',
      filter,
    } = paginationDto;
    const query = this.typeOrmRepository
      .createQueryBuilder('lead')
      .leftJoinAndSelect('lead.properties', 'property');

    if (filter === 'PRIORITY') {
      query.andWhere((qb) => {
        const subQuery = qb
          .subQuery()
          .select('1')
          .from('properties', 'p')
          .where('p.leadId = lead.id')
          .andWhere('p.area > 100')
          .getQuery();
        return 'EXISTS ' + subQuery;
      });
    } else if (filter) {
      query.where('lead.name ILIKE :filter OR lead.cpf ILIKE :filter', {
        filter: `%${filter}%`,
      });
    }

    if (sortBy) {
      query.orderBy(`lead.${sortBy}`, sortOrder as 'ASC' | 'DESC');
    } else {
      query.orderBy('lead.id', 'DESC');
    }

    const [leads, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    const data = leads.map((lead) => ({
      ...lead,
      isPriority: lead.properties.some((p) => p.area > 100),
    }));

    return { data, total };
  }

  async findOne(id: number): Promise<Lead | null> {
    return this.typeOrmRepository.findOneBy({ id });
  }

  async update(id: number, updateLeadDto: UpdateLeadDto): Promise<Lead | null> {
    const lead = await this.typeOrmRepository.preload({
      id: id,
      ...updateLeadDto,
    });
    if (!lead) {
      return null;
    }
    return this.typeOrmRepository.save(lead);
  }

  async remove(id: number): Promise<void> {
    const lead = await this.findOne(id);
    if (lead) {
      await this.typeOrmRepository.remove(lead);
    }
  }

  async preload(entityLike: any): Promise<Lead | undefined> {
    return this.typeOrmRepository.preload(entityLike);
  }
}
