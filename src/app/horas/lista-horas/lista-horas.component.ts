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
import { AuthService } from '../../_services/auth.service';
import { LayoutService } from '../../layout/layout.service';
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
  private listaHoras: Hora[];
  private horaActual: Hora;
  private lista: Array<{ time: number, horas: Hora[], subHoras: number, subMinutos: number }>;
  private fDesde: Date;

  private hourdiv: number;

  @ViewChild(SelectHoraHastaComponent) horaHasta: SelectHoraHastaComponent;

  constructor(private service: HoraService,
              private as: AlertService,
              private datePipe: DatePipe,
              private authService: AuthService,
              private layoutService: LayoutService) {
  }

  ngOnInit() {
    this.tareaActual = {} as TipoTarea;
    this.proyectoActual = {} as Proyecto;
    this.horaActual = {} as Hora;

    this.diaActual = new Date();
    this.horaActual.horaIn = '00:00';
    this.horaActual.horaOut = '00:00';

    this.hourdiv = 4;
    this.lista = [];

    this.fDesde = new Date();
    if (this.fDesde.getMonth() === 0) {
      this.fDesde.setMonth(11);
      this.fDesde.setFullYear(this.fDesde.getFullYear() - 1);
    } else {
      this.fDesde.setMonth(this.fDesde.getMonth() - 1);
    }

    this.LoadHoras();
  }

  private LoadHoras() {
    this.layoutService.updatePreloaderState('active');
    this.service.getPorUsuarioYFecha(this.authService.getCurrentUser().id, this.fDesde, new Date()).subscribe(
      (data) => {
        this.listaHoras = data;
        this.OrdenarLista();
        if (this.lista.length > 0) {
          this.horaActual.proyecto = this.lista[0].horas[0].proyecto;
          this.proyectoActual = this.lista[0].horas[0].proyecto;
          this.horaActual.tipoTarea = this.lista[0].horas[0].tipoTarea;
          this.tareaActual = this.lista[0].horas[0].tipoTarea;
          this.layoutService.updatePreloaderState('hide');
        }
      },
      (error) => {
        this.as.error(error, 5000);
        this.layoutService.updatePreloaderState('hide');
      }
    );
  }

  private OrdenarLista() {

    this.lista = new Array<{ time: number, horas: Hora[], subHoras: number, subMinutos: number }>();

    // Ordenamos la lista por fecha en forma descendente.
    this.listaHoras.forEach((x) => {

      const dateAux: Date = this.dateFromString(x.dia);
      if (this.lista.find((y) => y.time === dateAux.getTime()) === undefined) {
        this.lista.push({ time: dateAux.getTime(), horas: new Array(), subHoras: 0, subMinutos: 0 });
      }
      this.lista.find((y) => y.time === dateAux.getTime()).horas.push(x);
    });

    // Ordenamos los registros de dias.
    this.lista.sort((a: { time: number, horas: Hora[], subHoras: number, subMinutos: number }, b: { time: number, horas: Hora[], subHoras: number, subMinutos: number }) => {
      return b.time - a.time;
    });

    // Dentro de cada dia ordenamos por la hora de inicio.
    this.lista.forEach((x) => {
      x.horas.sort((a: Hora, b: Hora) => {
        const dia: Date = new Date(x.time);
        return (new Date(dia.getFullYear(),
                         dia.getMonth(),
                         dia.getDay(),
                         +b.horaIn.split(':')[0],
                         +b.horaIn.split(':')[1]).getTime() -

                    new Date(dia.getFullYear(),
                         dia.getMonth(),
                         dia.getDay(),
                         +a.horaIn.split(':')[0],
                         +a.horaIn.split(':')[1]).getTime());
      });

      x.horas.forEach((y) => {
        x.subHoras += +y.subtotal.split(':')[0];
        x.subMinutos += +y.subtotal.split(':')[1];
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
    this.horaHasta.loadValues(evt.id);
  }

  HoraOutOnChange(evt) {
  }

  fDesdeOnChange(evt) {
    this.LoadHoras();
  }

  AgregarOnClick() {

    this.horaActual.colaborador = this.authService.getCurrentUser();
    this.horaActual.dia = this.datePipe.transform(this.diaActual, 'dd-MM-yyyy');

    this.layoutService.updatePreloaderState('active');
    this.service.create(this.horaActual).subscribe(
      (data) => {
        this.as.success('Registro agregado correctamente.', 3000);
        this.listaHoras.push(data);
        this.OrdenarLista();
        this.horaHasta.loadValues(0);
        this.horaActual = {} as Hora;
        this.horaActual.tipoTarea = this.tareaActual;
        this.horaActual.proyecto = this.proyectoActual;
        this.layoutService.updatePreloaderState('hide');
      },
      (error) => {
        this.as.error(error, 5000);
        this.layoutService.updatePreloaderState('hide');
      }
    );
  }

  dateFromString(str: string): Date {
    const aux: string[] = str.split('-');
    return new Date(+aux[2], +aux[1] - 1, +aux[0]);
  }
}
