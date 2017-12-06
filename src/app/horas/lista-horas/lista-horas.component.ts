import { Component, OnInit } from '@angular/core';
import { Proyecto, TipoTarea, Hora, HoraImp, Cargo, TipoTareaImp } from '../../_models/models';

@Component({
  selector: 'app-lista-horas',
  templateUrl: './lista-horas.component.html',
  styleUrls: ['./lista-horas.component.scss']
})
export class ListaHorasComponent implements OnInit {

  private proyectoActual: Proyecto;
  private tareaActual: TipoTarea;
  private horaActual: Hora;

  constructor() {

  }

  ngOnInit() {
    this.tareaActual = {} as TipoTarea;
    this.proyectoActual = {} as Proyecto;
    this.horaActual = {} as HoraImp;
  }

  ProyectoOnChange(evt: Proyecto) {
    this.horaActual.proyecto = evt;
  }

  TareaOnChange(evt: TipoTarea) {
    this.horaActual.tipoTarea = evt;
  }

  HoraOnChange(evt){

  }
}
