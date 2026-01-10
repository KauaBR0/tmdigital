import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DashboardService } from './dashboard.service';
import { Lead } from '../leads/lead.entity';
import { Property } from '../properties/property.entity';
import { Repository } from 'typeorm';

describe('DashboardService', () => {
  let service: DashboardService;
  let leadRepository: Repository<Lead>;
  let propertyRepository: Repository<Property>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DashboardService,
        {
          provide: getRepositoryToken(Lead),
          useValue: {
            count: jest.fn(),
            createQueryBuilder: jest.fn(() => ({
              select: jest.fn().mockReturnThis(),
              addSelect: jest.fn().mockReturnThis(),
              groupBy: jest.fn().mockReturnThis(),
              getRawMany: jest.fn(),
            })),
          },
        },
        {
          provide: getRepositoryToken(Property),
          useValue: {
            createQueryBuilder: jest.fn(() => ({
              select: jest.fn().mockReturnThis(),
              addSelect: jest.fn().mockReturnThis(),
              groupBy: jest.fn().mockReturnThis(),
              getRawMany: jest.fn(),
            })),
          },
        },
      ],
    }).compile();

    service = module.get<DashboardService>(DashboardService);
    leadRepository = module.get<Repository<Lead>>(getRepositoryToken(Lead));
    propertyRepository = module.get<Repository<Property>>(getRepositoryToken(Property));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getMetrics', () => {
    it('should return metrics', async () => {
      jest.spyOn(leadRepository, 'count').mockResolvedValue(10);
      
      const metrics = await service.getMetrics();
      expect(metrics.totalLeads).toBe(10);
      expect(metrics).toHaveProperty('statusBreakdown');
      expect(metrics).toHaveProperty('cropSummary');
    });
  });
});
