import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from '../property.entity';
import { IPropertiesRepository } from './property.repository.interface';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';

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

  async findAll(leadId?: number): Promise<Property[]> {
    if (leadId) {
      return this.typeOrmRepository.find({ where: { leadId } });
    }
    return this.typeOrmRepository.find({ relations: ['lead'] });
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
