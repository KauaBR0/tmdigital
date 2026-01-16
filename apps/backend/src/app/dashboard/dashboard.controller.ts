import {
  Controller,
  Get,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { DashboardService } from './dashboard.service';
import { CropType } from '../properties/property.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @UseInterceptors(CacheInterceptor)
  @Get('metrics')
  getMetrics(@Query('crop') crop?: CropType) {
    return this.dashboardService.getMetrics(crop);
  }
}
