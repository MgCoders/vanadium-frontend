import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Proyecto, ProyectoImp } from '../../_models/models';
import { ProyectoService } from '../../_services/proyecto.service';
import { AlertService } from '../../_services/alert.service';
import { LayoutService } from '../../layout/layout.service';

@Component({
  selector: 'app-alta-proyecto',
  templateUrl: './alta-proyecto.component.html',
  styleUrls: ['./alta-proyecto.component.scss']
})

export class AltaProyectoComponent implements OnInit {

  public proyectoActual: Proyecto;

  constructor(public dialogRef: MatDialogRef<AltaProyectoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: [Proyecto, Proyecto[]],
              private cs: ProyectoService,
              private as: AlertService,
              private layoutService: LayoutService) { }

  ngOnInit() {
    if (this.data[0] === undefined) {
      this.proyectoActual = {} as Proyecto;
    } else {
      this.proyectoActual = new ProyectoImp(this.data[0]);
    }
  }

  Cerrar() {
    this.dialogRef.close();
  }

  Guardar() {
    this.layoutService.updatePreloaderState('active');
    if (this.data[0] === undefined) {
      this.cs.create(this.proyectoActual).subscribe(
        (data) => {
          this.layoutService.updatePreloaderState('hide');
          this.as.success('Proyecto agregado correctamente.', 3000);
          this.data[1].push(data);
          this.dialogRef.close();
        },
        (error) => {
          this.layoutService.updatePreloaderState('hide');
          this.as.error(error, 5000);
        });
    } else {
      this.cs.edit(this.proyectoActual).subscribe(
        (data) => {
          this.layoutService.updatePreloaderState('hide');
          this.as.success('Proyecto actualizado correctamente.', 3000);
          const index: number = this.data[1].indexOf(this.data[0]);
          this.data[1][index] = data;
          this.dialogRef.close();
        },
        (error) => {
          this.layoutService.updatePreloaderState('hide');
          this.as.error(error, 5000);
        });
    }
  }
}
