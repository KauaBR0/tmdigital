import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property } from '../models/property.model';

@Injectable({ providedIn: 'root' })
export class PropertiesService {
  private apiUrl = '/api/properties';

  constructor(private http: HttpClient) {}

  getProperties(
    leadId?: number,
    page = 1,
    limit = 10,
    filter?: string,
  ): Observable<{ data: Property[]; total: number }> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (leadId) {
      params = params.set('leadId', leadId.toString());
    }

    if (filter) {
      params = params.set('filter', filter);
    }

    return this.http.get<{ data: Property[]; total: number }>(this.apiUrl, {
      params,
    });
  }

  getProperty(id: number): Observable<Property> {
    return this.http.get<Property>(`${this.apiUrl}/${id}`);
  }

  createProperty(property: Partial<Property>): Observable<Property> {
    return this.http.post<Property>(this.apiUrl, property);
  }

  updateProperty(property: Property): Observable<Property> {
    const { id, ...updateData } = property;
    return this.http.patch<Property>(`${this.apiUrl}/${id}`, updateData);
  }

  deleteProperty(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
