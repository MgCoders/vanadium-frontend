import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { AltaCargoComponent } from '../alta-cargo/alta-cargo.component';
import { CargoService } from '../../_services/cargo.service';
import { AlertService } from '../../_services/alert.service';
import { Cargo, PrecioHora } from '../../_models/models';
import { LayoutService } from '../../layout/layout.service';
import { DialogConfirmComponent } from '../../shared/dialog-confirm/dialog-confirm.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-historico-precio-cargo',
  templateUrl: './historico-precio-cargo.component.html',
  styleUrls: ['./historico-precio-cargo.component.scss']
})
export class HistoricoPrecioCargoComponent implements OnInit {

  public cargoActual: Cargo;
  public idCargoActual: number;

  constructor(public dialog: MatDialog,
              private service: CargoService,
              private as: AlertService,
              private route: ActivatedRoute,
              private layoutService: LayoutService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.idCargoActual = +params['id'];
      this.LoadCargo();
    });
  }

  LoadCargo() {
    this.layoutService.updatePreloaderState('active');
    this.service.get(1).subscribe(
      (data) => {
        this.cargoActual = data;
        this.cargoActual.precioHoraHistoria.sort((a: PrecioHora, b: PrecioHora) => {
          return this.dateFromString(b.vigenciaDesde).getTime() - this.dateFromString(a.vigenciaDesde).getTime();
        });
        this.layoutService.updatePreloaderState('hide');
      },
      (error) => {
        this.layoutService.updatePreloaderState('hide');
        this.as.error(error, 5000);
      });
  }

  Nuevo() {
    const dialog = this.dialog.open(AltaCargoComponent, {
      data: [undefined, this.cargoActual.precioHoraHistoria],
      width: '600px',
    });
  }

  Eliminar(x: Cargo) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: '¿Está seguro que desea eliminar el cargo ' + x.nombre + '?',
    });

    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result) {
          // TODO
          this.as.success('Cargo eliminado correctamente.', 3000);
        }
      });
  }

  Editar(x: Cargo) {
    const dialog = this.dialog.open(AltaCargoComponent, {
      data: [x, this.cargoActual.precioHoraHistoria],
      width: '600px',
    });
  }

  dateFromString(str: string): Date {
    const aux: string[] = str.split('-');
    return new Date(+aux[2], +aux[1] - 1, +aux[0]);
  }
}
