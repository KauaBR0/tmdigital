import { Property } from '../property.entity';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';

export interface IPropertiesRepository {
  create(createPropertyDto: CreatePropertyDto): Promise<Property>;
  findAll(leadId?: number): Promise<Property[]>;
  findOne(id: number): Promise<Property | null>;
  update(
    id: number,
    updatePropertyDto: UpdatePropertyDto,
  ): Promise<Property | null>;
  remove(id: number): Promise<void>;
  findOneWithRelations(id: number): Promise<Property | null>;
}
