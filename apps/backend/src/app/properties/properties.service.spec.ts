import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PropertiesService } from './properties.service';
import { Property, CropType } from './property.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('PropertiesService', () => {
  let service: PropertiesService;
  let repository: Repository<Property>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PropertiesService,
        {
          provide: getRepositoryToken(Property),
          useValue: {
            find: jest.fn(),
            findOneBy: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            preload: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PropertiesService>(PropertiesService);
    repository = module.get<Repository<Property>>(getRepositoryToken(Property));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all properties if no leadId provided', async () => {
      const result: Property[] = [];
      jest.spyOn(repository, 'find').mockResolvedValue(result);
      expect(await service.findAll()).toBe(result);
    });

    it('should return properties by leadId', async () => {
      const result: Property[] = [];
      jest.spyOn(repository, 'find').mockResolvedValue(result);
      expect(await service.findAll(1)).toBe(result);
      expect(repository.find).toHaveBeenCalledWith({ where: { leadId: 1 } });
    });
  });

  describe('create', () => {
    it('should create a property', async () => {
      const dto = { crop: CropType.SOY, area: 150, leadId: 1 };
      const property = { id: 1, ...dto } as Property;
      jest.spyOn(repository, 'create').mockReturnValue(property);
      jest.spyOn(repository, 'save').mockResolvedValue(property);
      expect(await service.create(dto)).toBe(property);
    });
  });

  describe('findOne', () => {
    it('should return a property', async () => {
      const property = { id: 1 } as Property;
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(property);
      expect(await service.findOne(1)).toBe(property);
    });

    it('should throw NotFoundException', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);
      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });
});
