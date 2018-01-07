import {
  Component,
  OnInit
} from '@angular/core';
import { AlertService } from '../../_services/alert.service';
import { ReporteService } from '../../_services/reporte.service';
import { ProyectoService } from '../../_services/proyecto.service';
import { TareaService } from '../../_services/tarea.service';
import { AuthService } from '../../_services/auth.service';
import { Proyecto } from '../../_models/Proyecto';
import { TipoTarea } from '../../_models/TipoTarea';
import { LayoutService } from '../../layout/layout.service';
import { HorasProyectoTipoTareaXCargo } from '../../_models/HorasProyectoTipoTareaXCargo';

@Component({
  selector: 'horas-reporte',
  styles: [],
  templateUrl: './horas-reporte.component.html'
})

export class HorasReporteComponent implements OnInit {

  public proyectoActual: Proyecto;
  public tareaActual: TipoTarea;
  public horasProyectoTipoTareaXCargo: HorasProyectoTipoTareaXCargo[];

  constructor(private reporteService: ReporteService,
              private alertService: AlertService,
              private proyectoService: ProyectoService,
              private tareaService: TareaService,
              private authService: AuthService,
              private layoutService: LayoutService) { }

  ngOnInit(): void {
    this.layoutService.updatePreloaderState('active');
    this.tareaActual = {} as TipoTarea;
    this.proyectoActual = {} as Proyecto;
    this.layoutService.updatePreloaderState('hide');
  }

  proyectoSeleccionado(proyecto: Proyecto) {
    this.proyectoActual = proyecto;
    this.proyectoOTareaSeleccionados();
  }

  tareaSeleccionada(tarea: TipoTarea) {
    this.tareaActual = tarea;
    this.proyectoOTareaSeleccionados();
  }

  proyectoOTareaSeleccionados() {
    if (this.proyectoActual.id && this.tareaActual.id) {
      this.layoutService.updatePreloaderState('active');

      this.reporteService.getHorasProyectoTipoTareaXCargo(this.proyectoActual, this.tareaActual).subscribe(
          (data) => {
            this.horasProyectoTipoTareaXCargo = data;
          },
          (error) => {
            this.alertService.error(error, 5000);
          });

      this.layoutService.updatePreloaderState('hide');
    }
  }

}
