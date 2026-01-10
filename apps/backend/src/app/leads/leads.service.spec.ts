import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LeadsService } from './leads.service';
import { Lead, LeadStatus } from './lead.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('LeadsService', () => {
  let service: LeadsService;
  let repository: Repository<Lead>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LeadsService,
        {
          provide: getRepositoryToken(Lead),
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

    service = module.get<LeadsService>(LeadsService);
    repository = module.get<Repository<Lead>>(getRepositoryToken(Lead));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of leads with priority', async () => {
      const result = [{ id: 1, properties: [{ area: 150 }] }] as any;
      jest.spyOn(repository, 'find').mockResolvedValue(result);

      const leads = await service.findAll();
      expect(leads[0].isPriority).toBe(true);
    });
  });

  describe('create', () => {
    it('should create a new lead', async () => {
      const dto = { name: 'Test', cpf: '12345678901' };
      const lead = { id: 1, ...dto, status: LeadStatus.NEW } as Lead;
      jest.spyOn(repository, 'create').mockReturnValue(lead);
      jest.spyOn(repository, 'save').mockResolvedValue(lead);

      expect(await service.create(dto)).toEqual(lead);
    });
  });

  describe('findOne', () => {
    it('should return a lead if it exists', async () => {
      const lead = { id: 1, name: 'Test' } as Lead;
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(lead);

      expect(await service.findOne(1)).toEqual(lead);
    });

    it('should throw NotFoundException if lead does not exist', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a lead', async () => {
      const lead = { id: 1, name: 'Updated' } as Lead;
      jest.spyOn(repository, 'preload').mockResolvedValue(lead);
      jest.spyOn(repository, 'save').mockResolvedValue(lead);

      expect(await service.update(1, { name: 'Updated' })).toEqual(lead);
    });

    it('should throw NotFoundException if lead to update does not exist', async () => {
      jest.spyOn(repository, 'preload').mockResolvedValue(null);

      await expect(service.update(1, { name: 'Updated' })).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a lead', async () => {
      const lead = { id: 1 } as Lead;
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(lead);
      jest.spyOn(repository, 'remove').mockResolvedValue(lead);

      await service.remove(1);
      expect(repository.remove).toHaveBeenCalledWith(lead);
    });
  });
});