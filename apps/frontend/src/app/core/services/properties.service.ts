import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property } from '../models/property.model';

@Injectable({ providedIn: 'root' })
export class PropertiesService {
  private apiUrl = '/api/properties';

  constructor(private http: HttpClient) {}

  getProperties(leadId?: number): Observable<Property[]> {
    const url = leadId ? `${this.apiUrl}?leadId=${leadId}` : this.apiUrl;
    return this.http.get<Property[]>(url);
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
