import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Colaborador } from '../_models/Colaborador';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ColaboradorService {

  constructor(public http: HttpClient) { }

  getAll(): Observable<Colaborador[]> {
    return this.http.get<Colaborador[]>(`${environment.apiUrl}/colaboradores/`);
  }

  get(id: number): Observable<Colaborador> {
    return this.http.get<Colaborador>(`${environment.apiUrl}/colaboradores/` + id);
  }

  create(x: Colaborador): Observable<any> {
    return this.http.post(`${environment.apiUrl}/colaboradores/`, x);
  }

  edit(x: Colaborador): Observable<any> {
    return this.http.put(`${environment.apiUrl}/colaboradores/` + x.id, x);
  }
}
