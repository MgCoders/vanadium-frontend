import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { TipoTarea } from '../_models/models';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TareaService {

  constructor(public http: HttpClient) { }

  getAll(): Observable<TipoTarea[]> {
    return this.http.get<TipoTarea[]>(`${environment.apiUrl}/tareas/`);
  }

  get(id: number): Observable<TipoTarea> {
    return this.http.get<TipoTarea>(`${environment.apiUrl}/tareas/` + id);
  }

  create(x: TipoTarea): Observable<any> {
    return this.http.post(`${environment.apiUrl}/tareas/`, x);
  }

  edit(x: TipoTarea): Observable<any> {
        return this.http.put(`${environment.apiUrl}/tareas/` + x.id, x);
  }
}
