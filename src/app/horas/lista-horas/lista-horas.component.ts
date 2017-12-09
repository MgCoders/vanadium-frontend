import { Component, OnInit, ViewChild } from '@angular/core';
import { Proyecto, TipoTarea, Hora, HoraImp, Cargo, TipoTareaImp } from '../../_models/models';
import { HoraService } from '../../_services/hora.service';
import { AuthService } from '../../_services/auth.service';
import { AlertService } from '../../_services/alert.service';
import { SelectHoraHastaComponent } from '../select-hora-hasta/select-hora-hasta.component';

@Component({
  selector: 'app-lista-horas',
  templateUrl: './lista-horas.component.html',
  styleUrls: ['./lista-horas.component.scss']
})
export class ListaHorasComponent implements OnInit {

  private proyectoActual: Proyecto;
  private tareaActual: TipoTarea;
  private horaActual: HoraImp;

  @ViewChild(SelectHoraHastaComponent) horaHasta: SelectHoraHastaComponent;

  constructor(private service: HoraService,
              private as: AlertService) {}

  ngOnInit() {
    this.tareaActual = {} as TipoTarea;
    this.proyectoActual = {} as Proyecto;
    this.horaActual = {} as HoraImp;

    this.horaActual.dia = new Date();
    this.horaActual.horaInNumber = 0;
    this.horaActual.horaOutNumber = 0;
  }

  ProyectoOnChange(evt: Proyecto) {
    this.horaActual.proyecto = evt;
  }

  TareaOnChange(evt: TipoTarea) {
    this.horaActual.tipoTarea = evt;
  }

  HoraInOnChange(evt) {
    this.horaHasta.loadValues(this.horaActual.horaInNumber);
  }

  HoraOutOnChange(evt){
  }
}
