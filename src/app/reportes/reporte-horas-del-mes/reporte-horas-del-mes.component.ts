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
  HoraDetalleImp,
  Colaborador,
  Cargo
} from '../../_models/models';
import { HoraImp } from '../../_models/HoraImp';
import { HoraService } from '../../_services/hora.service';
import { AlertService } from '../../_services/alert.service';
import { AuthService } from '../../_services/auth.service';
import { LayoutService } from '../../layout/layout.service';
import { DatePipe } from '@angular/common';
import { DecimalPipe } from '@angular/common';
import { CustomDatePipe } from '../../_pipes/customDate.pipe';
import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA
} from '@angular/material';
import { DialogConfirmComponent } from '../../shared/dialog-confirm/dialog-confirm.component';

import {
  FormControl,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { TimePipe } from '../../_pipes/time.pipe';
import { CargoService } from '../../_services/cargo.service';
import { ColaboradorService } from '../../_services/colaborador.service';
import { ReporteService } from '../../_services/reporte.service';
import { HorasProyectoXCargo } from '../../_models/HorasProyectoXCargo';
import { ProyectoService } from '../../_services/proyecto.service';

@Component({
  selector: 'app-reporte-horas-del-mes',
  templateUrl: './reporte-horas-del-mes.component.html',
  styleUrls: ['./reporte-horas-del-mes.component.scss']
})
export class ReporteHorasDelMesComponent implements OnInit {

  public proyectoActual: Proyecto;
  public proyectos: Proyecto[];
  public reporteHoras: HorasProyectoXCargo[];
  public listaTotales: Array<{ cargo: Cargo, cantidadHoras: number, importe: number }>;
  public colaboradores: Colaborador[];
  public listaCargos: Cargo[];
  public listaColaboradoresPorCargo: Array<{ id: number, lista: Array<{ iniciales: string, nombre: string }> }>;
  public totalHoras: number;
  public totalImporte: number;
  public loading: number;

  constructor(private service: ReporteService,
              private cargoDervice: CargoService,
              private colaboradorService: ColaboradorService,
              private proyectoService: ProyectoService,
              private as: AlertService,
              private datePipe: DatePipe,
              private customDatePipe: CustomDatePipe,
              private decimalPipe: DecimalPipe,
              private timePipe: TimePipe,
              private authService: AuthService,
              private layoutService: LayoutService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.Clear();
    this.proyectoActual = {} as Proyecto;
    this.listaColaboradoresPorCargo = new Array();
    this.colaboradores = new Array();

    this.loading = 1;
    this.layoutService.updatePreloaderState('active');
    this.cargoDervice.getAll().subscribe(
      (data) => {

        data.forEach((c) => {
          this.listaColaboradoresPorCargo.push({ id: c.id, lista: new Array() });
        });

        this.listaCargos = data;
        this.listaCargos.sort((a: Cargo, b: Cargo) => {
          return a.id - b.id;
        });

        // Cargamos los colaboradores.
        this.colaboradorService.getAll().subscribe(
          (dataC) => {
            this.colaboradores = dataC;
            this.listaCargos.forEach((c) => {
              this.listaColaboradoresPorCargo.find((h) => h.id === c.id).lista = this.GetIniciales(c);
            });

            this.proyectoService.getAll().subscribe(
              (dataP) => {
                this.proyectos = dataP;
                this.loading--;
                this.layoutService.updatePreloaderState('hide');

                // Cargamos el resumen.
                this.Reload();
              },
              (errorP) => {
                this.loading--;
                this.layoutService.updatePreloaderState('hide');
                this.as.error(errorP, 5000);
              }
            );
          },
          (errorC) => {
            this.loading--;
            this.layoutService.updatePreloaderState('hide');
            this.as.error(errorC, 5000);
          }
        );
      },
      (error) => {
        this.loading--;
        this.layoutService.updatePreloaderState('hide');
        this.as.error(error, 5000);
      });
  }

  Clear() {
    this.reporteHoras = new Array();
    this.listaTotales = new Array();
    this.listaCargos = new Array();
    this.totalHoras = 0;
    this.totalImporte = 0;
  }

  public Reload() {
    this.Clear();

    if (this.proyectoActual.id === undefined) {
      this.LoadTotalesProyecto(0);
      return;
    } else {
      this.LoadTotalesProyecto(undefined);
    }
  }

  LoadTotalesProyecto(indiceP: number) {
    // Si solo quiero un proyecto
    if (indiceP === undefined) {
      this.loading++;
      this.layoutService.updatePreloaderState('active');
      this.service.getReporte1Totales(this.proyectoActual).subscribe(
        (data) => {
          data.forEach((x) => {
            if (x.cargo !== undefined) {
              const indice: number = this.listaTotales.findIndex((y) => y.cargo.id === x.cargo.id);
              if (indice === -1) {
                this.listaTotales.push({ cargo: x.cargo, cantidadHoras: x.cantidadHoras, importe: x.precioTotal });
              } else {
                this.listaTotales[indice].cantidadHoras += x.cantidadHoras;
                this.listaTotales[indice].importe += x.precioTotal;
              }
              this.totalHoras += x.cantidadHoras;
              this.totalImporte += x.precioTotal;
            }
          });

          this.listaTotales.sort((a: { cargo: Cargo, cantidadHoras: number, importe: number }, b: { cargo: Cargo, cantidadHoras: number, importe: number }) => {
            return b.cargo.precioHoraHistoria[0].precioHora - a.cargo.precioHoraHistoria[0].precioHora;
          });

          this.loading--;
          this.layoutService.updatePreloaderState('hide');
        },
        (error) => {
          this.loading--;
          this.as.error(error, 5000);
          this.layoutService.updatePreloaderState('active');
        }
      );
    } else {
      if (indiceP < this.proyectos.length) {
        this.loading++;
        this.layoutService.updatePreloaderState('active');
        this.service.getReporte1Totales(this.proyectos[indiceP]).subscribe(
          (data) => {
            data.forEach((x) => {
              if (x.cargo !== undefined) {
                const indice: number = this.listaTotales.findIndex((y) => y.cargo.id === x.cargo.id);
                if (indice === -1) {
                  this.listaTotales.push({ cargo: x.cargo, cantidadHoras: x.cantidadHoras, importe: x.precioTotal });
                } else {
                  this.listaTotales[indice].cantidadHoras += x.cantidadHoras;
                  this.listaTotales[indice].importe += x.precioTotal;
                }
                this.totalHoras += x.cantidadHoras;
                this.totalImporte += x.precioTotal;
              }
            });

            this.LoadTotalesProyecto(indiceP + 1);
            this.loading--;
            this.layoutService.updatePreloaderState('hide');
          },
          (error) => {
            this.as.error(error, 5000);
            this.loading--;
            this.layoutService.updatePreloaderState('active');
          }
        );
      } else {
        this.listaTotales.sort((a: { cargo: Cargo, cantidadHoras: number, importe: number }, b: { cargo: Cargo, cantidadHoras: number, importe: number }) => {
          return b.cargo.precioHoraHistoria[0].precioHora - a.cargo.precioHoraHistoria[0].precioHora;
        });
      }
    }
  }

  proyectoSeleccionado(proyecto: Proyecto) {
    this.proyectoActual = proyecto;
    this.Reload();
  }

  // TODO Modularizar.
  GetMinutosToString(m: number) {
    const horas = Math.trunc((m) / 60);
    const minutos = (m) - Math.trunc((m) / 60) * 60;
    return horas + ' hs. ' + minutos + ' min.';
  }

  // TODO Modularizar, se repite en el reporte de cargos.
  GetIniciales(c: Cargo): Array<{ iniciales: string, nombre: string }> {
    const result: Array<{ iniciales: string, nombre: string }> = new Array();
    if (this.colaboradores === undefined) {
      return result;
    }

    this.colaboradores
      .filter((x) => x.cargo != null && x.cargo.id === c.id)
      .forEach((x) => {
        const ini: string[] = x.nombre.split(' ');
        let aux: string = '';
        ini.forEach((y) => {
          if (y.length > 0) {
            aux += y[0];
          }
        });
        result.push({ iniciales: aux.toUpperCase(), nombre: x.nombre });
      });

    return result;
  }

  GetInicialesAux(id: number): Array<{ iniciales: string, nombre: string }> {
    if (this.listaColaboradoresPorCargo === undefined || this.listaColaboradoresPorCargo.length === 0) {
      return new Array();
    }
    return this.listaColaboradoresPorCargo.find((x) => x.id === id).lista;
  }
}
