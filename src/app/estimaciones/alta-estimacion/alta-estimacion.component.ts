import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import {
  Estimacion,
  EstimacionImp,
  Proyecto
} from '../../_models/models';
import { EstimacionService } from '../../_services/estimacion.service';
import { AlertService } from '../../_services/alert.service';
import { LayoutService } from '../../layout/layout.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

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

  constructor(public dialogRef: MatDialogRef<AltaEstimacionComponent>,
              @Inject(MAT_DIALOG_DATA) public data: [Estimacion, Estimacion[]],
              private cs: EstimacionService,
              private as: AlertService,
              private layoutService: LayoutService,
              private datePipe: DatePipe) { }

  ngOnInit() {
     if (this.data[0] === undefined) {
      this.estimacionActual = {} as Estimacion;
      this.proyectoActual = {} as Proyecto;
      this.fechaActual = new Date();
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
      this.cs.create(this.estimacionActual).subscribe(
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
      this.cs.edit(this.estimacionActual).subscribe(
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
