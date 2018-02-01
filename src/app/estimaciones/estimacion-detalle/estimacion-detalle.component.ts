import { Component, OnInit } from '@angular/core';
import { EstimacionService } from '../../_services/estimacion.service';
import { CargoService } from '../../_services/cargo.service';
import { TareaService } from '../../_services/tarea.service';
import { AlertService } from '../../_services/alert.service';
import {
  Estimacion,
  EstimacionCargo,
  EstimacionTipoTarea,
  Proyecto,
  Cargo,
  TipoTarea
} from '../../_models/models';
import { LayoutService } from '../../layout/layout.service';
import { ActivatedRoute } from '@angular/router';
import { EstimacionImp } from '../../_models/EstimacionImp';
import { TimePipe } from '../../_pipes/time.pipe';
import {
  FormControl,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-estimacion-detalle',
  templateUrl: './estimacion-detalle.component.html',
  styleUrls: ['./estimacion-detalle.component.scss']
})
export class EstimacionDetalleComponent implements OnInit {

  public idEstimacionActual: number;
  public estimacionActual: Estimacion;
  public editando: boolean;
  public cargos: Cargo[];
  public tareas: TipoTarea[];
  public estCargo: EstimacionCargo[];
  public tareasCargos: Array<{idTarea: number, nombreTarea: string, cargos: Array<{idCargo: number, nombreCargo: string, value: number, FC: FormControl}>}>;

  constructor(private service: EstimacionService,
              private serviceC: CargoService,
              private serviceT: TareaService,
              private as: AlertService,
              private route: ActivatedRoute,
              private timePipe: TimePipe,
              private layoutService: LayoutService) { }

  ngOnInit() {
    this.editando = false;
    this.estCargo = new Array();
    this.tareasCargos = new Array();
    this.route.params.subscribe((params) => {
      this.idEstimacionActual = +params['id'];
      this.layoutService.updatePreloaderState('active');
      this.serviceC.getAll().subscribe(
        (datac) => {
          this.cargos = datac;
          this.serviceT.getAll().subscribe(
            (datat) => {
              this.tareas = datat;
              this.LoadEstimacion();
            },
            (error) => {
              this.as.error(error, 5000);
              this.layoutService.updatePreloaderState('hide');
            });
        },
        (error) => {
          this.as.error(error, 5000);
          this.layoutService.updatePreloaderState('hide');
        });
    });
  }

  LoadEstimacion() {
    this.layoutService.updatePreloaderState('active');
    this.service.get(this.idEstimacionActual).subscribe(
      (data) => {
        this.estimacionActual = data;

        this.estimacionActual.estimacionCargos.forEach((x) => {
          x.estimacionTipoTareas.forEach((y) => {
            if (this.tareasCargos.findIndex((t) => t.idTarea === y.tipoTarea.id) === -1) {
              this.tareasCargos.push({idTarea: y.tipoTarea.id, nombreTarea: y.tipoTarea.nombre, cargos: new Array()});
            }
            this.tareasCargos.find((t) => t.idTarea === y.tipoTarea.id).cargos.push({idCargo: x.cargo.id, nombreCargo: x.cargo.codigo, value: +this.timePipe.transform(y.duracion, ['HH']), FC: new FormControl('', [Validators.required, Validators.min(0)])});
          });
        });

        this.layoutService.updatePreloaderState('hide');
      },
      (error) => {
        this.layoutService.updatePreloaderState('hide');
        this.as.error(error, 5000);
      });
  }

  Editar() {
    this.cargos.forEach((x) => {
      this.tareasCargos.forEach((y) => {
        if (y.cargos.findIndex((c) => c.idCargo === x.id) === -1) {
          y.cargos.push({idCargo: x.id, nombreCargo: x.codigo, value: 0, FC: new FormControl('', [Validators.required, Validators.min(0)])});
        }
      });
    });

    this.tareas.forEach((x) => {
      if (this.tareasCargos.findIndex((y) => y.idTarea === x.id) === -1) {
        this.tareasCargos.push({idTarea: x.id, nombreTarea: x.nombre, cargos: new Array()});
        this.cargos.forEach((c) => {
          this.tareasCargos.find((y) => y.idTarea === x.id).cargos.push({idCargo: c.id, nombreCargo: c.codigo, value: 0, FC: new FormControl('', [Validators.required, Validators.min(0)])});
        });
      }
    });

    this.editando = true;
  }

  GuardarOnClick() {
    this.tareasCargos.forEach((x) => {
      x.cargos.forEach((y) => {
        if (this.estimacionActual.estimacionCargos.findIndex((c) => c.cargo.id === y.idCargo) === -1) {
          this.estimacionActual.estimacionCargos.push({cargo: this.cargos.find((p) => p.id === y.idCargo), estimacionTipoTareas: new Array(), precioTotal: 0});
        }
        if (this.estimacionActual.estimacionCargos.find((c) => c.cargo.id === y.idCargo).estimacionTipoTareas.findIndex((p) => p.tipoTarea.id === x.idTarea) === -1) {
          this.estimacionActual.estimacionCargos.find((c) => c.cargo.id === y.idCargo).estimacionTipoTareas.push({duracion: 'PT0H0M', tipoTarea: this.tareas.find((p) => p.id === x.idTarea)});
        }

        this.estimacionActual.estimacionCargos.find((c) => c.cargo.id === y.idCargo).estimacionTipoTareas.find((t) => t.tipoTarea.id === x.idTarea).duracion = 'PT' + y.value + 'H0M';
      });
    });

    this.layoutService.updatePreloaderState('active');
    this.service.edit(this.estimacionActual).subscribe(
      (data) => {
        this.estimacionActual = data;
        this.layoutService.updatePreloaderState('hide');
      },
      (error) => {
        this.as.error(error, 5000);
        this.layoutService.updatePreloaderState('hide');
      }
    );
  }

  Cancelar() {
    this.editando = false;
  }

  GetTotalTarea(id: number){
    let result: number = 0;
    this.tareasCargos.find((x) => x.idTarea === id).cargos.forEach((x) => {
      if (x.value !== undefined) {
        result += x.value;
      }
    });
    return result;
  }

  EstimacionTieneTarea(idTarea: number) {
    return this.estimacionActual.estimacionCargos.findIndex((x) => x.estimacionTipoTareas.findIndex((y) => y.id === idTarea) >= 0) >= 0;
  }

  CargoTieneTarea(idCargo: number, idTarea: number) {
    return this.estimacionActual.estimacionCargos.findIndex((x) => x.id === idCargo) >= 0 &&
           this.estimacionActual.estimacionCargos.find((x) => x.id === idCargo).estimacionTipoTareas.findIndex((y) => y.id === idTarea) >= 0;
  }
}
