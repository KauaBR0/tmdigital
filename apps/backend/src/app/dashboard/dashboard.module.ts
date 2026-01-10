import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { Lead } from '../leads/lead.entity';
import { Property } from '../properties/property.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lead, Property])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
