import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import {
  Estimacion,
  EstimacionImp,
  Proyecto,
  Cargo,
  TipoTarea,
  EstimacionCargo,
  EstimacionTipoTarea
} from '../../_models/models';
import { EstimacionService } from '../../_services/estimacion.service';
import { CargoService } from '../../_services/cargo.service';
import { TareaService } from '../../_services/tarea.service';
import { AlertService } from '../../_services/alert.service';
import { LayoutService } from '../../layout/layout.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CustomDatePipe } from '../../_pipes/customDate.pipe';

@Component({
  selector: 'app-alta-estimacion',
  templateUrl: './alta-estimacion.component.html',
  styleUrls: ['./alta-estimacion.component.scss']
})
export class AltaEstimacionComponent implements OnInit {

  public estimacionActual: Estimacion;
  public proyectoActual: Proyecto;
  public fechaActual: Date;

  public fechaFC = new FormControl('', [Validators.required]);
  public descripcionFC = new FormControl('', []);

  public cargos: Cargo[];
  public tareas: TipoTarea[];

  public loading: number;

  constructor(public dialogRef: MatDialogRef<AltaEstimacionComponent>,
              @Inject(MAT_DIALOG_DATA) public data: [Estimacion, Estimacion[]],
              private es: EstimacionService,
              private cs: CargoService,
              private ts: TareaService,
              private as: AlertService,
              private layoutService: LayoutService,
              private datePipe: DatePipe,
              private customDatePipe: CustomDatePipe) { }

  ngOnInit() {
     this.loading = 0;

     if (this.data[0] === undefined) {
      this.estimacionActual = {} as Estimacion;
      this.proyectoActual = {} as Proyecto;
      this.fechaActual = new Date();

      this.loading++;
      this.cs.getAll().subscribe(
        (data) => {
          this.cargos = data;
          this.loading--;
        },
        (error) => {
          this.as.error(error, 5000);
        }
      );
      this.loading++;
      this.ts.getAll().subscribe(
        (data) => {
          this.tareas = data;
          this.loading--;
        },
        (error) => {
          this.as.error(error, 5000);
        }
      );

    } else {
      this.estimacionActual = new EstimacionImp(this.data[0]);
      this.fechaActual = this.dateFromString(this.estimacionActual.fecha);
      this.proyectoActual = this.estimacionActual.proyecto;
    }
  }

  Cerrar() {
    this.dialogRef.close();
  }

  Guardar() {
    this.layoutService.updatePreloaderState('active');
    this.estimacionActual.fecha = this.datePipe.transform(this.fechaActual, 'dd-MM-yyyy');

    if (this.data[0] === undefined) {
      // Agregamos la lista de detalle cargo y tarea.
      this.estimacionActual.estimacionCargos = new Array();
      this.cargos.forEach((x) => {
        const detalleCargo = {cargo: x, precioTotal: 0, estimacionTipoTareas: new Array()} as EstimacionCargo;
        this.estimacionActual.estimacionCargos.push(detalleCargo);
        this.tareas.forEach((y) => {
          const detalleTarea = {tipoTarea: y, duracion: 'PT0H0M'} as EstimacionTipoTarea;
          detalleCargo.estimacionTipoTareas.push(detalleTarea);
        });
      });

      this.es.create(this.estimacionActual).subscribe(
        (data) => {
          this.as.success('Estimación agregada correctamente.', 3000);
          this.data[1].push(data);
          this.layoutService.updatePreloaderState('hide');
          this.dialogRef.close();
        },
        (error) => {
          this.layoutService.updatePreloaderState('hide');
          this.as.error(error, 5000);
        });
    } else {
      this.es.edit(this.estimacionActual).subscribe(
        (data) => {
          this.layoutService.updatePreloaderState('hide');
          this.as.success('Estimación actualizada correctamente.', 3000);
          const index: number = this.data[1].indexOf(this.data[0]);
          this.data[1][index] = data;
          this.dialogRef.close();
        },
        (error) => {
          this.layoutService.updatePreloaderState('hide');
          this.as.error(error, 5000);
        });
    }
  }

  dateFromString(str: string): Date {
    const aux: string[] = str.split('-');
    return new Date(+aux[2], +aux[1] - 1, +aux[0]);
  }

  ProyectoOnChange(evt: Proyecto) {
    this.estimacionActual.proyecto = evt;
  }
}
