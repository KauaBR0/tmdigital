import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UF {
  id: number;
  sigla: string;
  nome: string;
}

export interface Municipio {
  id: number;
  nome: string;
}

@Injectable({
  providedIn: 'root',
})
export class IbgeService {
  private http = inject(HttpClient);
  private readonly BASE_URL =
    'https://servicodados.ibge.gov.br/api/v1/localidades';

  getUFs(): Observable<UF[]> {
    return this.http.get<UF[]>(`${this.BASE_URL}/estados?orderBy=nome`);
  }

  getMunicipios(ufSigla: string): Observable<Municipio[]> {
    return this.http.get<Municipio[]>(
      `${this.BASE_URL}/estados/${ufSigla}/municipios`,
    );
  }
}
