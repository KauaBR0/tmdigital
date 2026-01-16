import { Property } from '../property.entity';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { PaginationDto } from '../../../common/dto/pagination.dto';

export interface IPropertiesRepository {
  create(createPropertyDto: CreatePropertyDto): Promise<Property>;
  findAll(
    paginationDto: PaginationDto,
    leadId?: number,
  ): Promise<{ data: any[]; total: number }>;
  findOne(id: number): Promise<Property | null>;
  update(
    id: number,
    updatePropertyDto: UpdatePropertyDto,
  ): Promise<Property | null>;
  remove(id: number): Promise<void>;
  findOneWithRelations(id: number): Promise<Property | null>;
}
