import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Cargo } from '../../_models/models';
import { CargoService } from '../../_services/cargo.service';
import { AlertService } from '../../_services/alert.service';

@Component({
  selector: 'app-alta-cargo',
  templateUrl: './alta-cargo.component.html',
  styleUrls: ['./alta-cargo.component.scss']
})
export class AltaCargoComponent implements OnInit {

  private cargoActual: Cargo;

  constructor(public dialogRef: MatDialogRef<AltaCargoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: [Cargo, Cargo[]],
              private cs: CargoService,
              private as: AlertService) { }

  ngOnInit() {
    if (this.data[0] === undefined) {
      this.cargoActual = {} as Cargo;
    }
  }

  Cerrar() {
    this.dialogRef.close();
  }

  Guardar() {
    this.cs.create(this.cargoActual).subscribe(
      (data) => {
        this.as.success('Cargo agregado correctamente.', 3000);
        this.data[1].push(this.cargoActual);
        this.dialogRef.close();
      },
      (error) => {
        /* this.as.error(error, 5000); */
      });
  }
}
