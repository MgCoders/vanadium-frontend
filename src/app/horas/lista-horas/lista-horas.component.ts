import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  Hora,
  HoraImp,
  Proyecto,
  TipoTarea
} from '../../_models/models';
import { HoraService } from '../../_services/hora.service';
import { AlertService } from '../../_services/alert.service';
import { SelectHoraHastaComponent } from '../select-hora-hasta/select-hora-hasta.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-lista-horas',
  templateUrl: './lista-horas.component.html',
  styleUrls: ['./lista-horas.component.scss']
})
export class ListaHorasComponent implements OnInit {

  private proyectoActual: Proyecto;
  private tareaActual: TipoTarea;
  private diaActual: Date;
  private inActual: string;
  private inNumberActual: number;
  private outNumberActual: number;
  private outActual: string;
  private listaHoras: Hora[];
  private lista: Array<{ time: string, horas: Hora[] }>;

  private hourdiv: number;

  @ViewChild(SelectHoraHastaComponent) horaHasta: SelectHoraHastaComponent;

  constructor(private service: HoraService,
              private as: AlertService,
              private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.tareaActual = {} as TipoTarea;
    this.proyectoActual = {} as Proyecto;

    this.diaActual = new Date();
    this.inNumberActual = 0;
    this.outNumberActual = 0;

    this.hourdiv = 4;
    this.lista = [];

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
    this.lista = [];

    // Ordenamos la lista por fecha en forma descendente.
    this.listaHoras.forEach((x) => {
      // if (this.lista.find((y) => y.time === x.dia.getTime()) === undefined) {
      this.lista.push({time: x.dia, horas: []});
      //}
      this.lista.find((y) => y.time === x.dia).horas.push(x);
    });

    // Ordenamos los registros de dias.
    //this.lista.sort((a: { time: number, horas: Hora[] }, b: { time: number, horas: Hora[] }) => {
    //  return b.time - a.time;
    //});

    // Dentro de cada dia ordenamos por la hora de inicio.
    // this.lista.forEach((x) => {
    //   x.horas.sort((a: Hora, b: Hora) => {
    //  return b.horaIn.getTime() - a.horaIn.getTime();
    //  });
    //  });
  }

  ProyectoOnChange(evt: Proyecto) {
    this.proyectoActual = evt;
  }

  TareaOnChange(evt: TipoTarea) {
    this.tareaActual = evt;
  }

  HoraInOnChange(evt) {
    this.horaHasta.loadValues(this.inNumberActual);
    this.inActual = evt.value;
  }

  HoraOutOnChange(evt) {
    console.info(evt);
    this.outActual = evt.value;
  }

  AgregarOnClick() {
    const horaActual: HoraImp = new HoraImp();
    horaActual.colaborador = JSON.parse(localStorage.getItem('currentUser'));
    horaActual.dia = this.datePipe.transform(this.diaActual, 'dd-MM-yyyy');
    horaActual.proyecto = this.proyectoActual;
    horaActual.tipoTarea = this.tareaActual;
    horaActual.horaIn = this.inActual;
    horaActual.horaOut = this.outActual;


    this.listaHoras.push(horaActual);

    this.tareaActual = {} as TipoTarea;
    this.proyectoActual = {} as Proyecto;


    this.OrdenarLista();
    this.horaHasta.loadValues(0);
    this.service.create(horaActual).subscribe(
      (data) => { this.as.success('Registro agregado correctamente.', 3000); },
      (error) => { this.as.error(error, 5000); }
    );
  }
}
