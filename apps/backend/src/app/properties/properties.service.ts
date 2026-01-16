import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { IPropertiesRepository } from './repositories/property.repository.interface';
import { Property } from './property.entity';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

@Injectable()
export class PropertiesService {
  constructor(
    @Inject('IPropertiesRepository')
    private readonly propertyRepository: IPropertiesRepository,
  ) {}

  async create(createPropertyDto: CreatePropertyDto): Promise<Property> {
    return this.propertyRepository.create(createPropertyDto);
  }

  async findAll(leadId?: number): Promise<Property[]> {
    return this.propertyRepository.findAll(leadId);
  }

  async findOne(id: number): Promise<Property> {
    const property = await this.propertyRepository.findOne(id);
    if (!property) {
      throw new NotFoundException(`Property #${id} not found`);
    }
    return property;
  }

  async update(
    id: number,
    updatePropertyDto: UpdatePropertyDto,
  ): Promise<Property> {
    const property = await this.propertyRepository.update(
      id,
      updatePropertyDto,
    );
    if (!property) {
      throw new NotFoundException(`Property #${id} not found`);
    }
    return property;
  }

  async remove(id: number): Promise<void> {
    const property = await this.propertyRepository.findOne(id);
    if (!property) {
      throw new NotFoundException(`Property #${id} not found`);
    }
    await this.propertyRepository.remove(id);
  }
}
