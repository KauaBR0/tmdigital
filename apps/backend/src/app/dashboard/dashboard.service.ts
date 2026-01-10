import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from '../leads/lead.entity';
import { Property, CropType } from '../properties/property.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Lead)
    private readonly leadRepository: Repository<Lead>,
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
  ) {}

  async getMetrics(crop?: CropType) {
    const leadQuery = this.leadRepository.createQueryBuilder('lead');
    if (crop) {
      leadQuery.innerJoin(
        'lead.properties',
        'property',
        'property.crop = :crop',
        { crop }
      );
    }
    const totalLeads = await leadQuery.getCount();

    const statusBreakdown = await leadQuery
      .select('lead.status', 'status')
      .addSelect('COUNT(lead.id)', 'count')
      .groupBy('lead.status')
      .getRawMany();

    const propertyQuery =
      this.propertyRepository.createQueryBuilder('property');
    if (crop) {
      propertyQuery.where('property.crop = :crop', { crop });
    }
    const cropSummary = await propertyQuery
      .select('property.crop', 'crop')
      .addSelect('SUM(property.area)', 'totalArea')
      .addSelect('COUNT(property.id)', 'count')
      .groupBy('property.crop')
      .getRawMany();

    return {
      totalLeads,
      statusBreakdown,
      cropSummary,
    };
  }
}
