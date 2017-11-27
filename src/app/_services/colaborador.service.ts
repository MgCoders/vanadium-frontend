import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Colaborador } from '../_models/Colaborador';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ColaboradorService {

  constructor(public http: HttpClient) { }

  getColaboradores(): Observable<Colaborador[]> {
    return this.http.get<Colaborador[]>(`${environment.apiUrl}/colaboradores/`);
  }

  getColaborador(id: number): Observable<Colaborador> {
    return this.http.get<Colaborador>(`${environment.apiUrl}/colaboradores/` + id);
  }

  createColaborador(colaborador: Colaborador): Observable<any> {
    return this.http.post(`${environment.apiUrl}/colaboradores/`, colaborador);
  }

  editColaborador(colaborador: Colaborador): Observable<any> {
        return this.http.put(`${environment.apiUrl}/colaboradores/` + colaborador.id, colaborador);
  }

}
