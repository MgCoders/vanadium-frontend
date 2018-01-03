import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  Hora,
  Proyecto,
  TipoTarea
} from '../../_models/models';
import { HoraImp } from '../../_models/HoraImp';
import { HoraService } from '../../_services/hora.service';
import { AlertService } from '../../_services/alert.service';
import { AuthService } from '../../_services/auth.service';
import { LayoutService } from '../../layout/layout.service';
import { SelectHoraHastaComponent } from '../select-hora-hasta/select-hora-hasta.component';
import { DatePipe } from '@angular/common';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { EditHoraComponent } from '../edit-hora/edit-hora.component';
import { DialogConfirmComponent } from '../../shared/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-lista-horas',
  templateUrl: './lista-horas.component.html',
  styleUrls: ['./lista-horas.component.scss']
})
export class ListaHorasComponent implements OnInit {

  public proyectoActual: Proyecto;
  public tareaActual: TipoTarea;
  public diaActual: Date;
  public listaHoras: Hora[];
  public horaActual: Hora;
  public lista: Array<{ time: number, horas: Hora[], subHoras: number, subMinutos: number }>;
  public fDesde: Date;

  @ViewChild(SelectHoraHastaComponent) horaHasta: SelectHoraHastaComponent;

  constructor(private service: HoraService,
              private as: AlertService,
              private datePipe: DatePipe,
              private authService: AuthService,
              private layoutService: LayoutService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.tareaActual = {} as TipoTarea;
    this.proyectoActual = {} as Proyecto;
    this.horaActual = {} as Hora;

    this.diaActual = new Date();
    this.horaActual.horaIn = '00:00';
    this.horaActual.horaOut = '00:00';

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
          //this.horaActual.proyecto = this.lista[0].horas[0].proyecto;
          //this.proyectoActual = this.lista[0].horas[0].proyecto;
          //this.horaActual.tipoTarea = this.lista[0].horas[0].tipoTarea;
          //this.tareaActual = this.lista[0].horas[0].tipoTarea;
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
        if (x.subMinutos >= 60 ) {
          x.subMinutos = x.subMinutos - 60;
          x.subHoras ++;
        }
      });
    });
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
        //this.horaActual.tipoTarea = this.tareaActual;
        //this.horaActual.proyecto = this.proyectoActual;
        this.layoutService.updatePreloaderState('hide');
      },
      (error) => {
        this.as.error(error, 5000);
        this.layoutService.updatePreloaderState('hide');
      });
  }

  dateFromString(str: string): Date {
    const aux: string[] = str.split('-');
    return new Date(+aux[2], +aux[1] - 1, +aux[0]);
  }

  Editar(x: Hora) {
    const dialog = this.dialog.open(EditHoraComponent, {
      data: [x, this.listaHoras],
      width: '500px',
    });

    dialog.afterClosed().subscribe(
      (result) => {
        this.OrdenarLista();
    });
  }

  Eliminar(x: Hora) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: '¿Está seguro que desea eliminar la hora ' + x.id + '?',
    });

    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result) {
          // TODO LLamar al servicio.
          this.listaHoras.splice(this.listaHoras.indexOf(x), 1);
          this.OrdenarLista();
          this.as.success('Hora eliminada correctamente.', 3000);
        }
    });
  }
}
