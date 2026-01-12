import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from './property.entity';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
  ) {}

  async create(createPropertyDto: CreatePropertyDto): Promise<Property> {
    const property = this.propertyRepository.create(createPropertyDto);
    return this.propertyRepository.save(property);
  }

  async findAll(leadId?: number): Promise<Property[]> {
    if (leadId) {
      return this.propertyRepository.find({ where: { leadId } });
    }
    return this.propertyRepository.find({ relations: ['lead'] });
  }

  async findOne(id: number): Promise<Property> {
    const property = await this.propertyRepository.findOneBy({ id });
    if (!property) {
      throw new NotFoundException(`Property #${id} not found`);
    }
    return property;
  }

  async update(
    id: number,
    updatePropertyDto: UpdatePropertyDto,
  ): Promise<Property> {
    const property = await this.propertyRepository.preload({
      id: id,
      ...updatePropertyDto,
    });
    if (!property) {
      throw new NotFoundException(`Property #${id} not found`);
    }
    await this.propertyRepository.save(property);
    return this.propertyRepository.findOne({
      where: { id },
      relations: ['lead'],
    });
  }

  async remove(id: number): Promise<void> {
    const property = await this.findOne(id);
    await this.propertyRepository.remove(property);
  }
}
