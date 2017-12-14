import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { AltaProyectoComponent } from '../alta-proyecto/alta-proyecto.component';
import { ProyectoService } from '../../_services/proyecto.service';
import { AlertService } from '../../_services/alert.service';
import { Proyecto } from '../../_models/models';
import { LayoutService } from '../../layout/layout.service';
import { DialogConfirmComponent } from '../../shared/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-lista-proyectos',
  templateUrl: './lista-proyectos.component.html',
  styleUrls: ['./lista-proyectos.component.scss']
})
export class ListaProyectosComponent implements OnInit {

  public lista: Proyecto[];

  constructor(public dialog: MatDialog,
              private service: ProyectoService,
              private as: AlertService,
              private layoutService: LayoutService) { }

  ngOnInit() {
    this.lista = new Array();

    this.layoutService.updatePreloaderState('active');
    this.service.getAll().subscribe(
      (data) => {
        this.lista = data;
        // tslint:disable-next-line:only-arrow-functions
        this.lista.sort(function(a, b) {
          return a.id - b.id;
        });
        this.layoutService.updatePreloaderState('hide');
      },
      (error) => {
        this.layoutService.updatePreloaderState('hide');
        this.as.error(error, 5000);
      });
  }

  Nuevo() {
    const dialog = this.dialog.open(AltaProyectoComponent, {
      data: [undefined, this.lista],
      width: '600px',
    });
  }

  Eliminar(x: Proyecto) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: '¿Está seguro que desea eliminar el proyecto ' + x.nombre + '?',
    });

    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result) {
          // TODO
          this.as.success('Proyecto eliminado correctamente.', 3000);
        }
      });
  }

  Editar(x: Proyecto) {
    const dialog = this.dialog.open(AltaProyectoComponent, {
      data: [x, this.lista],
      width: '600px',
    });
  }
}
