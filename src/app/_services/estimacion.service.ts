import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Estimacion, EstimacionDetalle } from '../_models/models';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EstimacionService {

  constructor(public http: HttpClient) { }

  getAll(): Observable<Estimacion[]> {
    return this.http.get<Estimacion[]>(`${environment.apiUrl}/estimaciones/`);
  }

  get(id: number): Observable<Estimacion> {
    return this.http.get<Estimacion>(`${environment.apiUrl}/estimaciones/` + id);
  }

  create(x: Estimacion): Observable<any> {
    return this.http.post(`${environment.apiUrl}/estimaciones/`, x);
  }

  edit(x: Estimacion): Observable<any> {
        return this.http.put(`${environment.apiUrl}/estimaciones/` + x.id, x);
  }
}
