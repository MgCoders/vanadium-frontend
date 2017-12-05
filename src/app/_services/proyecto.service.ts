import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Proyecto } from '../_models/models';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProyectoService {

  constructor(public http: HttpClient) { }

  getAll(): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(`${environment.apiUrl}/proyectos/`);
  }

  get(id: number): Observable<Proyecto> {
    return this.http.get<Proyecto>(`${environment.apiUrl}/proyectos/` + id);
  }

  create(x: Proyecto): Observable<any> {
    return this.http.post(`${environment.apiUrl}/proyectos/`, x);
  }

  edit(x: Proyecto): Observable<any> {
        return this.http.put(`${environment.apiUrl}/proyectos/` + x.id, x);
  }
}
