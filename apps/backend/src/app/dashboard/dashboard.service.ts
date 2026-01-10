import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from '../leads/lead.entity';
import { Property } from '../properties/property.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Lead)
    private readonly leadRepository: Repository<Lead>,
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
  ) {}

  async getMetrics() {
    const totalLeads = await this.leadRepository.count();
    const statusBreakdown = await this.leadRepository
      .createQueryBuilder('lead')
      .select('lead.status', 'status')
      .addSelect('COUNT(lead.id)', 'count')
      .groupBy('lead.status')
      .getRawMany();

    const cropSummary = await this.propertyRepository
      .createQueryBuilder('property')
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
