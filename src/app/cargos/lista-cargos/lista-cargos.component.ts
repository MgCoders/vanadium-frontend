import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { AltaCargoComponent } from '../alta-cargo/alta-cargo.component';
import { CargoService } from '../../_services/cargo.service';
import { AlertService } from '../../_services/alert.service';
import { Cargo } from '../../_models/models';

@Component({
  selector: 'app-lista-cargos',
  templateUrl: './lista-cargos.component.html',
  styleUrls: ['./lista-cargos.component.scss']
})
export class ListaCargosComponent implements OnInit {

  private lista: Cargo[];

  constructor(public dialog: MatDialog,
              private cs: CargoService,
              private as: AlertService) { }

  ngOnInit() {
    this.lista = new Array();

    this.lista = new Array();
    this.cs.getAll().subscribe(
      (data) => {
        this.lista = data;
      },
      (error) => {
        /* this.as.error(error, 5000); */
      });
  }

  NuevoCargo() {
    const dialog = this.dialog.open(AltaCargoComponent, {
      data: [undefined, this.lista],
      width: '600px',
    });
  }
}
