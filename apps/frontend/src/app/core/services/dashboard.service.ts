import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private apiUrl = '/api/dashboard/metrics';

  constructor(private http: HttpClient) {}

  getMetrics(crop?: string): Observable<any> {
    const url = crop ? `${this.apiUrl}?crop=${crop}` : this.apiUrl;
    return this.http.get<any>(url);
  }
}
