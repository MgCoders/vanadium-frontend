import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Hora, Proyecto, TipoTarea } from '../../_models/models';
import { HoraImp } from '../../_models/HoraImp';
import { HoraService } from '../../_services/hora.service';
import { AlertService } from '../../_services/alert.service';
import { LayoutService } from '../../layout/layout.service';
import { SelectHoraHastaComponent } from '../select-hora-hasta/select-hora-hasta.component';

@Component({
  selector: 'app-edit-hora',
  templateUrl: './edit-hora.component.html',
  styleUrls: ['./edit-hora.component.scss']
})
export class EditHoraComponent implements OnInit {

  public horaActual: Hora;
  public proyectoActual: Proyecto;
  public tareaActual: TipoTarea;
  public diaActual: Date;

  @ViewChild(SelectHoraHastaComponent) horaHasta: SelectHoraHastaComponent;

  constructor(public dialogRef: MatDialogRef<EditHoraComponent>,
              @Inject(MAT_DIALOG_DATA) public data: [Hora, Hora[]],
              private cs: HoraService,
              private as: AlertService,
              private layoutService: LayoutService,
              private datePipe: DatePipe) { }

  ngOnInit() {
    this.horaActual = new HoraImp(this.data[0]);
    //this.proyectoActual = this.horaActual.proyecto;
    //this.tareaActual = this.horaActual.tipoTarea;
    this.diaActual = this.dateFromString(this.horaActual.dia);
  }

  Cerrar() {
    this.dialogRef.close();
  }

  ProyectoOnChange(evt: Proyecto) {
    //this.horaActual.proyecto = evt;
  }

  TareaOnChange(evt: TipoTarea) {
    //this.horaActual.tipoTarea = evt;
  }

  HoraInOnChange(evt) {
    this.horaHasta.loadValues(evt.id);
    this.horaActual.horaOut = evt.hora;
  }

  HoraOutOnChange(evt) {
  }

  Guardar() {
    this.layoutService.updatePreloaderState('active');
    this.horaActual.dia = this.datePipe.transform(this.diaActual, 'dd-MM-yyyy');
    this.cs.edit(this.horaActual).subscribe(
      (data) => {
        this.as.success('Registro actualizado correctamente.', 3000);
        const index: number = this.data[1].indexOf(this.data[0]);
        this.data[1][index] = data;
        this.layoutService.updatePreloaderState('hide');
        this.dialogRef.close();
      },
      (error) => {
        this.layoutService.updatePreloaderState('hide');
        this.as.error(error, 5000);
      });
  }

  dateFromString(str: string): Date {
    const aux: string[] = str.split('-');
    return new Date(+aux[2], +aux[1] - 1, +aux[0]);
  }
}
