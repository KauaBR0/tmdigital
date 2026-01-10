import { Controller, Get, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { CropType } from '../properties/property.entity';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('metrics')
  getMetrics(@Query('crop') crop?: CropType) {
    return this.dashboardService.getMetrics(crop);
  }
}
