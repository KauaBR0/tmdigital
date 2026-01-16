import { Test, TestingModule } from '@nestjs/testing';
import { PropertiesService } from './properties.service';
import { Property, CropType } from './property.entity';
import { NotFoundException } from '@nestjs/common';

describe('PropertiesService', () => {
  let service: PropertiesService;
  let repository: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PropertiesService,
        {
          provide: 'IPropertiesRepository',
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PropertiesService>(PropertiesService);
    repository = module.get('IPropertiesRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return paginated properties if no leadId provided', async () => {
      const result = { data: [], total: 0 };
      repository.findAll.mockResolvedValue(result);
      expect(await service.findAll({})).toBe(result);
    });

    it('should return paginated properties by leadId', async () => {
      const result = { data: [], total: 0 };
      repository.findAll.mockResolvedValue(result);
      expect(await service.findAll({}, 1)).toBe(result);
      expect(repository.findAll).toHaveBeenCalledWith({}, 1);
    });
  });

  describe('create', () => {
    it('should create a property', async () => {
      const dto = { crop: CropType.SOY, area: 150, leadId: 1 };
      const property = { id: 1, ...dto } as Property;
      repository.create.mockResolvedValue(property);
      expect(await service.create(dto)).toBe(property);
    });
  });

  describe('findOne', () => {
    it('should return a property', async () => {
      const property = { id: 1 } as Property;
      repository.findOne.mockResolvedValue(property);
      expect(await service.findOne(1)).toBe(property);
    });

    it('should throw NotFoundException', async () => {
      repository.findOne.mockResolvedValue(null);
      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });
});
