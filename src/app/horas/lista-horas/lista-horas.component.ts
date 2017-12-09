import { Component, OnInit, ViewChild } from '@angular/core';
import {
  Proyecto, TipoTarea, Hora, HoraImp, Cargo, TipoTareaImp,
  User, Colaborador, ColaboradorImp
} from '../../_models/models';
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
  private listaHoras: Hora[];
  private lista: Array<{ time: number, horas: Hora[] }>;

  private hourdiv: number;

  @ViewChild(SelectHoraHastaComponent) horaHasta: SelectHoraHastaComponent;

  constructor(private service: HoraService,
              private as: AlertService) { }

  ngOnInit() {
    this.tareaActual = {} as TipoTarea;
    this.proyectoActual = {} as Proyecto;
    this.horaActual = {} as HoraImp;

    this.horaActual.dia = new Date();
    this.horaActual.horaInNumber = 0;
    this.horaActual.horaOutNumber = 0;

    this.hourdiv = 4;
    this.lista = new Array();

    this.service.getAll().subscribe(
      (data) => {
        this.listaHoras = data;
        this.OrdenarLista();
      },
      (error) => {
        this.as.error(error, 5000);
      }
    );
  }

  private OrdenarLista() {
    this.lista = new Array<{ time: number, horas: Hora[] }>();

    // Ordenamos la lista por fecha en forma descendente.
    this.listaHoras.forEach((x) => {
      if (this.lista.find((y) => y.time === x.dia.getTime()) === undefined) {
        this.lista.push({ time: x.dia.getTime(), horas: new Array() });
      }
      this.lista.find((y) => y.time === x.dia.getTime()).horas.push(x);
    });

    // Ordenamos los registros de dias.
    this.lista.sort((a: { time: number, horas: Hora[] }, b: { time: number, horas: Hora[] }) => {
      return b.time - a.time;
    });

    // Dentro de cada dia ordenamos por la hora de inicio.
    this.lista.forEach((x) => {
      x.horas.sort((a: Hora, b: Hora) => {
        return b.horaIn.getTime() - a.horaIn.getTime();
      });
    });
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

  HoraOutOnChange(evt) {
  }

  AgregarOnClick() {
    const u: User = JSON.parse(localStorage.getItem('currentUser'));
    const c: Colaborador = {} as Colaborador;
    //c.id = u.id;

    this.horaActual.colaborador = c;
    this.horaActual.horaIn = new Date();
    this.horaActual.horaIn.setTime(this.horaActual.dia.getTime());
    this.horaActual.horaIn.setHours(Math.floor(this.horaActual.horaInNumber / this.hourdiv));
    this.horaActual.horaIn.setMinutes((this.horaActual.horaInNumber % this.hourdiv) * (60 / this.hourdiv));
    this.horaActual.horaOut = new Date();
    this.horaActual.horaOut.setHours(Math.floor(this.horaActual.horaOutNumber / this.hourdiv));
    this.horaActual.horaOut.setMinutes((this.horaActual.horaOutNumber % this.hourdiv) * (60 / this.hourdiv));

    this.horaActual.dia.setHours(0);
    this.horaActual.dia.setMinutes(0);
    this.horaActual.dia.setSeconds(0);
    this.horaActual.dia.setMilliseconds(0);

    this.listaHoras.push(this.horaActual);

    this.tareaActual = {} as TipoTarea;
    this.proyectoActual = {} as Proyecto;
    this.horaActual = {} as HoraImp;

    this.horaActual.dia = new Date();
    this.horaActual.horaInNumber = 0;
    this.horaActual.horaOutNumber = 0;

    this.OrdenarLista();
    this.horaHasta.loadValues(0);
/*     this.service.create(this.horaActual).subscribe(
      (data) => { this.as.success('Registro agregado correctamente.', 3000); },
      (error) => { this.as.error(error, 5000); }
    ); */
  }
}
