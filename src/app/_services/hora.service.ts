import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Hora } from '../_models/models';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HoraService {

  constructor(public http: HttpClient) { }

  getAll(): Observable<Hora[]> {
    return this.http.get<Hora[]>(`${environment.apiUrl}/horas/`);
  }

  get(id: number): Observable<Hora> {
    return this.http.get<Hora>(`${environment.apiUrl}/horas/` + id);
  }

  create(x: Hora): Observable<any> {
      console.info(JSON.stringify(x));
    return this.http.post(`${environment.apiUrl}/horas/`, x);
  }

  edit(x: Hora): Observable<any> {
        return this.http.put(`${environment.apiUrl}/horas/` + x.id, x);
  }
}
