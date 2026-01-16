import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lead } from '../models/lead.model';

@Injectable({ providedIn: 'root' })
export class LeadsService {
  private apiUrl = '/api/leads';

  constructor(private http: HttpClient) {}

  getLeads(
    page = 1,
    limit = 10,
    filter?: string,
  ): Observable<{ data: Lead[]; total: number }> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (filter) {
      params = params.set('filter', filter);
    }

    return this.http.get<{ data: Lead[]; total: number }>(this.apiUrl, {
      params,
    });
  }

  getLead(id: number): Observable<Lead> {
    return this.http.get<Lead>(`${this.apiUrl}/${id}`);
  }

  createLead(lead: Partial<Lead>): Observable<Lead> {
    return this.http.post<Lead>(this.apiUrl, lead);
  }

  updateLead(lead: Lead): Observable<Lead> {
    const { id, ...updateData } = lead;
    return this.http.patch<Lead>(`${this.apiUrl}/${id}`, updateData);
  }

  deleteLead(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
