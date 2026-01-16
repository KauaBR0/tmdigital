import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { Lead } from '../leads/lead.entity';
import { Property } from '../properties/property.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lead, Property]),
    CacheModule.register({
      ttl: 60000, // 60 seconds cache
      max: 10, // max 10 items in cache
    }),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
