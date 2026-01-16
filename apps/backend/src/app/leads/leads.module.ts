import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeadsService } from './leads.service';
import { LeadsController } from './leads.controller';
import { Lead } from './lead.entity';
import { LeadsRepository } from './repositories/lead.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Lead])],
  controllers: [LeadsController],
  providers: [
    LeadsService,
    {
      provide: 'ILeadsRepository',
      useClass: LeadsRepository,
    },
  ],
  exports: [LeadsService],
})
export class LeadsModule {}
