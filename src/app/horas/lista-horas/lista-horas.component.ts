import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  Hora,
  Proyecto,
  TipoTarea,
  HoraDetalle,
  HoraDetalleImp
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

  public listaHoras: Hora[];

  public horaActual: Hora;
  public diaActual: Date;

  public horaDetalleActual: HoraDetalle;
  public proyectoActual: Proyecto;
  public tareaActual: TipoTarea;

  public fDesde: Date;

  public hourdiv: number = 4;

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
    this.horaDetalleActual = {} as HoraDetalle;

    this.diaActual = new Date();
    this.horaActual.horaIn = this.GetHoraActualStr(this.diaActual);
    this.horaHasta.loadValuesFromStr(this.horaActual.horaIn);
    this.horaActual.horaOut = this.horaActual.horaIn;

    this.fDesde = new Date();
    if (this.fDesde.getMonth() === 0) {
      this.fDesde.setMonth(11);
      this.fDesde.setFullYear(this.fDesde.getFullYear() - 1);
    } else {
      this.fDesde.setMonth(this.fDesde.getMonth() - 1);
    }

    this.LoadHoras(true);
  }

  private LoadHoras(setHora: boolean) {
    this.layoutService.updatePreloaderState('active');
    this.service.getPorUsuarioYFecha(this.authService.getCurrentUser().id, this.fDesde, new Date()).subscribe(
      (data) => {
        this.listaHoras = data;

        // Si existe un dia sin completar y hay que setearlo se busca u se setea.
        if (setHora) {
          const ultimaHoraSinCargar: Hora = this.listaHoras.find((x) => !x.completa);
          if (ultimaHoraSinCargar !== undefined) {
            this.horaActual = ultimaHoraSinCargar;
            this.horaHasta.loadValuesFromStr(this.horaActual.horaIn);
          }
        }

        this.OrdenarLista();
        if (this.listaHoras.length > 0 && this.listaHoras[0].horaDetalleList.length > 0) {
          this.horaDetalleActual.proyecto = this.listaHoras[0].horaDetalleList[0].proyecto;
          this.proyectoActual = this.listaHoras[0].horaDetalleList[0].proyecto;
          this.horaDetalleActual.tipoTarea = this.listaHoras[0].horaDetalleList[0].tipoTarea;
          this.tareaActual = this.listaHoras[0].horaDetalleList[0].tipoTarea;
        }
        this.layoutService.updatePreloaderState('hide');
      },
      (error) => {
        this.as.error(error, 5000);
        this.layoutService.updatePreloaderState('hide');
      }
    );
  }

  private OrdenarLista() {
    this.listaHoras.sort((a: Hora, b: Hora) => {
      return this.dateFromString(b.dia).getTime() - this.dateFromString(a.dia).getTime();
    });
  }

  ProyectoOnChange(evt: Proyecto) {
    this.horaDetalleActual.proyecto = evt;
  }

  TareaOnChange(evt: TipoTarea) {
    this.horaDetalleActual.tipoTarea = evt;
  }

  HoraInOnChange(evt) {
    this.horaHasta.loadValues(evt.id);
    this.horaActual.horaOut = evt.hora;
  }

  HoraOutOnChange(evt) {
  }

  fDesdeOnChange(evt) {
    this.LoadHoras(true);
  }

  GuardarOnClick() {

    this.horaActual.colaborador = this.authService.getCurrentUser();
    this.horaActual.dia = this.datePipe.transform(this.diaActual, 'dd-MM-yyyy');

    this.layoutService.updatePreloaderState('active');
    if (this.horaActual.id === undefined) {
      this.service.create(this.horaActual).subscribe(
        (data) => {
          this.as.success('Registro agregado correctamente.', 3000);
          this.listaHoras.push(data);
          this.OrdenarLista();
          this.horaActual = data;
          this.layoutService.updatePreloaderState('hide');
        },
        (error) => {
          this.as.error(error, 5000);
          this.layoutService.updatePreloaderState('hide');
        });
    } else {
      this.service.edit(this.horaActual).subscribe(
        (data) => {
          this.as.success('Registro actualizado correctamente.', 3000);
          const index: number = this.listaHoras.indexOf(this.horaActual);
          this.listaHoras[index] = data;
          this.horaActual = data;
          this.OrdenarLista();
          this.layoutService.updatePreloaderState('hide');
        },
        (error) => {
          this.as.error(error, 5000);
          this.layoutService.updatePreloaderState('hide');
        });
    }
  }

  AgregarOnClick() {
    const aux: Hora = new HoraImp(this.horaActual);
    const aux2: HoraDetalle = new HoraDetalleImp(this.horaDetalleActual);
    aux2.duracion = 'PT' + aux2.duracion.split(':')[0] + 'H' + aux2.duracion.split(':')[1] + 'M';
    aux.horaDetalleList.push(aux2);
    this.service.edit(aux).subscribe(
      (data) => {
        this.as.success('Registro agregado correctamente.', 3000);
        const index: number = this.listaHoras.indexOf(this.horaActual);
        this.listaHoras[index] = data;
        this.horaActual = data;
        this.OrdenarLista();
        this.horaDetalleActual = {} as HoraDetalle;
        this.proyectoActual = {} as Proyecto;
        this.tareaActual = {} as TipoTarea;
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
    this.horaActual = x;
    this.horaHasta.loadValuesFromStr(x.horaIn);
    this.horaDetalleActual = {} as HoraDetalle;
    this.tareaActual = {} as TipoTarea;
    this.proyectoActual = {} as Proyecto;
  }

  Eliminar(x: Hora) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: '¿Está seguro que desea eliminar la hora ' + x.id + '?',
    });

    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result) {
          // TODO LLamar al servicio.
          // TODO Ver que hacer si es el registro actual.
          // this.listaHoras.splice(this.listaHoras.indexOf(x), 1);
          // this.OrdenarLista2();
          // this.as.success('Hora eliminada correctamente.', 3000);
        }
      });
  }

  EliminarTiempo(x: HoraDetalle) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: '¿Está seguro que desea eliminar el registro de tiempo?',
    });

    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result) {
          const aux: Hora = new HoraImp(this.horaActual);
          aux.horaDetalleList.splice(aux.horaDetalleList.indexOf(x), 1);
          this.service.edit(aux).subscribe(
            (data) => {
              this.as.success('Registro eliminado correctamente.', 3000);
              const index: number = this.listaHoras.indexOf(this.horaActual);
              this.listaHoras[index] = data;
              this.horaActual = data;
              this.OrdenarLista();
              this.layoutService.updatePreloaderState('hide');
            },
            (error) => {
              this.as.error(error, 5000);
              this.layoutService.updatePreloaderState('hide');
            });
        }
      });
  }

  Nuevo() {
    this.horaActual = {} as Hora;
    this.diaActual = new Date();
    this.horaActual.horaIn = this.GetHoraActualStr(this.diaActual);
    this.horaHasta.loadValuesFromStr(this.horaActual.horaIn);
    this.horaActual.horaOut = this.horaActual.horaIn;
  }

  GetHoraActualStr(ahora: Date) {
    let minutos: number = (Math.round(ahora.getMinutes() / (60 / this.hourdiv)) * (60 / this.hourdiv));
    const hotasInt: number = minutos === 60 ? ahora.getHours() + 1 :  ahora.getHours();
    const horas: string = hotasInt.toString().length === 1 ? '0' + hotasInt.toString() : hotasInt.toString();
    if (minutos === 60) {
      minutos = 0;
    }
    const minutosStr: string = minutos.toString().length === 1 ? '0' + minutos.toString() : minutos.toString();
    return horas + ':' + minutosStr;
  }
}
