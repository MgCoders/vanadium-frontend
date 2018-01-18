import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Proyecto } from '../_models/models';
import { Observable } from 'rxjs/Observable';
import { HorasProyectoTipoTareaCargoXColaborador } from '../_models/HorasProyectoTipoTareaCargoXColaborador';
import { HorasReporte1 } from '../_models/HorasProyectoTipoTareaXCargo';
import { EstimacionProyectoTipoTareaXCargo } from '../_models/EstimacionProyectoTipoTareaXCargo';
import { HorasProyectoXCargo } from '../_models/HorasProyectoXCargo';
import { TipoTarea } from '../_models/TipoTarea';

@Injectable()
export class ReporteService {

  constructor(public http: HttpClient) { }

  getHorasProyectoTipoTareaCargoXColaborador(): Observable<HorasProyectoTipoTareaCargoXColaborador[]> {
    return this.http.get<HorasProyectoTipoTareaCargoXColaborador[]>(`${environment.apiUrl}/horas/proyecto/tarea/cargo/`);
  }

  getHorasProyectoTipoTareaXCargo(proyecto: Proyecto, tarea: TipoTarea): Observable<HorasReporte1[]> {
    return this.http.get<HorasReporte1[]>(`${environment.apiUrl}/reportes/horas/proyecto/` + proyecto.id + `/tarea/` + tarea.id);
  }

  getEstimacionProyectoTipoTareaXCargo(proyecto: Proyecto, tarea: TipoTarea): Observable<EstimacionProyectoTipoTareaXCargo[]> {
    return this.http.get<EstimacionProyectoTipoTareaXCargo[]>(`${environment.apiUrl}/reportes/horas/proyecto/` + proyecto.id + `/tarea/` + tarea.id);
  }

  getHorasProyectoXCargo(proyecto: Proyecto): Observable<HorasProyectoXCargo[]> {
    return this.http.get<HorasProyectoXCargo[]>(`${environment.apiUrl}/reportes/horas/proyecto/` + proyecto.id);
  }
}
