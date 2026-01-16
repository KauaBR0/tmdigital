import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from '../property.entity';
import { IPropertiesRepository } from './property.repository.interface';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';

import { PaginationDto } from '../../../common/dto/pagination.dto';

@Injectable()
export class PropertiesRepository implements IPropertiesRepository {
  constructor(
    @InjectRepository(Property)
    private readonly typeOrmRepository: Repository<Property>,
  ) {}

  async create(createPropertyDto: CreatePropertyDto): Promise<Property> {
    const property = this.typeOrmRepository.create(createPropertyDto);
    return this.typeOrmRepository.save(property);
  }

  async findAll(
    paginationDto: PaginationDto,
    leadId?: number,
  ): Promise<{ data: any[]; total: number }> {
    const {
      page = 1,
      limit = 10,
      sortBy,
      sortOrder = 'ASC',
      filter,
    } = paginationDto;

    const query = this.typeOrmRepository
      .createQueryBuilder('property')
      .leftJoinAndSelect('property.lead', 'lead');

    if (leadId) {
      query.where('property.leadId = :leadId', { leadId });
    }

    if (filter) {
      // Basic filter by crop or owner name
      query.andWhere(
        '(property.crop ILIKE :filter OR lead.name ILIKE :filter)',
        { filter: `%${filter}%` },
      );
    }

    if (sortBy) {
      // Handle nested sorting like lead.name
      const orderField = sortBy.includes('.') ? sortBy : `property.${sortBy}`;
      query.orderBy(orderField, sortOrder as 'ASC' | 'DESC');
    } else {
      query.orderBy('property.id', 'DESC');
    }

    const [data, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return { data, total };
  }

  async findOne(id: number): Promise<Property | null> {
    return this.typeOrmRepository.findOneBy({ id });
  }

  async findOneWithRelations(id: number): Promise<Property | null> {
    return this.typeOrmRepository.findOne({
      where: { id },
      relations: ['lead'],
    });
  }

  async update(
    id: number,
    updatePropertyDto: UpdatePropertyDto,
  ): Promise<Property | null> {
    const property = await this.typeOrmRepository.preload({
      id: id,
      ...updatePropertyDto,
    });
    if (!property) {
      return null;
    }
    await this.typeOrmRepository.save(property);
    // Return complete object with relations as expected by the frontend
    return this.findOneWithRelations(id);
  }

  async remove(id: number): Promise<void> {
    const property = await this.findOne(id);
    if (property) {
      await this.typeOrmRepository.remove(property);
    }
  }
}
