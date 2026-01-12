import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { SelectModule } from 'primeng/select';
import { DashboardService } from '../core/services/dashboard.service';
import { CropType } from '../core/models/property.model';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule, ChartModule, CardModule, SelectModule],
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  private dashboardService = inject(DashboardService);

  totalLeads = 0;
  statusChartData: any;
  cityChartData: any;
  cropChartData: any;
  chartOptions: any;

  selectedCrop: string | null = null;
  cropOptions = [
    { label: 'Todas as Culturas', value: null },
    ...Object.values(CropType).map((c) => ({ label: c, value: c })),
  ];

  ngOnInit() {
    this.initChartOptions();
    this.loadMetrics();
  }

  initChartOptions() {
    this.chartOptions = {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: '#495057',
          },
        },
      },
    };
  }

  onFilterChange() {
    this.loadMetrics();
  }

  loadMetrics() {
    this.dashboardService
      .getMetrics(this.selectedCrop || undefined)
      .subscribe((metrics: any) => {
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

        // Process City Breakdown
        if (metrics.cityBreakdown) {
          const cities = metrics.cityBreakdown.map((c: any) => c.city || 'N/A');
          const cityCounts = metrics.cityBreakdown.map((c: any) => +c.count);
          this.cityChartData = {
            labels: cities,
            datasets: [
              {
                label: 'Leads por Cidade',
                data: cityCounts,
                backgroundColor: '#AB47BC',
              },
            ],
          };
        }

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
