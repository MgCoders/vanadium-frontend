import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { EstimacionService } from '../../_services/estimacion.service';
import { AlertService } from '../../_services/alert.service';
import { Estimacion } from '../../_models/models';
import { LayoutService } from '../../layout/layout.service';
import { DialogConfirmComponent } from '../../shared/dialog-confirm/dialog-confirm.component';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { DatePipe } from '@angular/common';
import { AltaEstimacionComponent } from '../alta-estimacion/alta-estimacion.component';

@Component({
  selector: 'app-lista-estimaciones',
  templateUrl: './lista-estimaciones.component.html',
  styleUrls: ['./lista-estimaciones.component.scss']
})
export class ListaEstimacionesComponent implements OnInit {

  public lista: Estimacion[];

  constructor(public dialog: MatDialog,
              private service: EstimacionService,
              private as: AlertService,
              private datePipe: DatePipe,
              private layoutService: LayoutService,
              private router: Router) { }

  ngOnInit() {
    this.lista = new Array();

    this.layoutService.updatePreloaderState('active');
    this.service.getAll().subscribe(
      (data) => {
        this.lista = data;
        // tslint:disable-next-line:only-arrow-functions
        this.lista.sort(function(a, b) {
          return this.datePipe.transform(b.fecha, 'dd-MM-yyyy').getTime() - this.datePipe.transform(b.fecha, 'dd-MM-yyyy').getTime();
        });
        this.layoutService.updatePreloaderState('hide');
      },
      (error) => {
        this.layoutService.updatePreloaderState('hide');
        this.as.error(error, 5000);
      });
  }

  Nuevo() {
    const dialog = this.dialog.open(AltaEstimacionComponent, {
      data: [undefined, this.lista],
      width: '600px',
    });
  }

  Eliminar(x: Estimacion) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: '¿Está seguro que desea eliminar el cargo ' + x.id + '?',
    });

    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result) {
          // TODO
          this.as.success('Cargo eliminado correctamente.', 3000);
        }
      });
  }

  Editar(x: Estimacion) {
    const dialog = this.dialog.open(AltaEstimacionComponent, {
      data: [x, this.lista],
      width: '600px',
    });
  }
}
