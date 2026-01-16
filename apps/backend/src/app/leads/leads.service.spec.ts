import { Test, TestingModule } from '@nestjs/testing';
import { LeadsService } from './leads.service';
import { Lead, LeadStatus } from './lead.entity';
import { NotFoundException } from '@nestjs/common';

describe('LeadsService', () => {
  let service: LeadsService;
  let repository: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LeadsService,
        {
          provide: 'ILeadsRepository',
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

    service = module.get<LeadsService>(LeadsService);
    repository = module.get('ILeadsRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return paginated leads', async () => {
      const result = { data: [{ id: 1, name: 'Test' }], total: 1 };
      repository.findAll.mockResolvedValue(result);

      const leads = await service.findAll({});
      expect(leads).toEqual(result);
    });
  });

  describe('create', () => {
    it('should create a new lead', async () => {
      const dto = { name: 'Test', cpf: '12345678901' };
      const lead = { id: 1, ...dto, status: LeadStatus.NEW } as Lead;
      repository.create.mockResolvedValue(lead);

      expect(await service.create(dto)).toEqual(lead);
    });
  });

  describe('findOne', () => {
    it('should return a lead if it exists', async () => {
      const lead = { id: 1, name: 'Test' } as Lead;
      repository.findOne.mockResolvedValue(lead);

      expect(await service.findOne(1)).toEqual(lead);
    });

    it('should throw NotFoundException if lead does not exist', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a lead', async () => {
      const lead = { id: 1, name: 'Updated' } as Lead;
      repository.update.mockResolvedValue(lead);

      expect(await service.update(1, { name: 'Updated' })).toEqual(lead);
    });

    it('should throw NotFoundException if lead to update does not exist', async () => {
      repository.update.mockResolvedValue(null);

      await expect(service.update(1, { name: 'Updated' })).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a lead', async () => {
      const lead = { id: 1 } as Lead;
      repository.findOne.mockResolvedValue(lead);
      repository.remove.mockResolvedValue(undefined);

      await service.remove(1);
      expect(repository.remove).toHaveBeenCalledWith(1);
    });
  });
});
