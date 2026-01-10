import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { DashboardService } from '../core/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, ChartModule, CardModule],
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  private dashboardService = inject(DashboardService);

  totalLeads = 0;
  statusChartData: any;
  cropChartData: any;
  chartOptions: any;

  ngOnInit() {
    this.initChartOptions();
    this.loadMetrics();
  }

  initChartOptions() {
    this.chartOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#495057',
          },
        },
      },
    };
  }

  loadMetrics() {
    this.dashboardService.getMetrics().subscribe((metrics: any) => {
      this.totalLeads = metrics.totalLeads;

      // Process Status Breakdown
      const statuses = metrics.statusBreakdown.map((s: any) => s.status);
      const statusCounts = metrics.statusBreakdown.map((s: any) => +s.count);
      this.statusChartData = {
        labels: statuses,
        datasets: [
          {
            data: statusCounts,
            backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#FF7043'],
          },
        ],
      };

      // Process Crop Summary
      const crops = metrics.cropSummary.map((c: any) => c.crop);
      const areas = metrics.cropSummary.map((c: any) => +c.totalArea);
      this.cropChartData = {
        labels: crops,
        datasets: [
          {
            label: 'Área Total (ha)',
            data: areas,
            backgroundColor: '#42A5F5',
          },
        ],
      };
    });
  }
}