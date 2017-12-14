import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { TipoTarea, TipoTareaImp } from '../../_models/models';
import { TareaService } from '../../_services/tarea.service';
import { AlertService } from '../../_services/alert.service';
import { LayoutService } from '../../layout/layout.service';

@Component({
  selector: 'app-alta-tarea',
  templateUrl: './alta-tarea.component.html',
  styleUrls: ['./alta-tarea.component.scss']
})
export class AltaTareaComponent implements OnInit {

  public tareaActual: TipoTarea;

  constructor(public dialogRef: MatDialogRef<AltaTareaComponent>,
              @Inject(MAT_DIALOG_DATA) public data: [TipoTarea, TipoTarea[]],
              private cs: TareaService,
              private as: AlertService,
              private layoutService: LayoutService) { }

  ngOnInit() {
    if (this.data[0] === undefined) {
      this.tareaActual = {} as TipoTarea;
    } else {
      this.tareaActual = new TipoTareaImp(this.data[0]);
    }
  }

  Cerrar() {
    this.dialogRef.close();
  }

  Guardar() {
    this.layoutService.updatePreloaderState('active');
    if (this.data[0] === undefined) {
      this.cs.create(this.tareaActual).subscribe(
        (data) => {
          this.layoutService.updatePreloaderState('hide');
          this.as.success('Tarea agregada correctamente.', 3000);
          this.data[1].push(data);
          this.dialogRef.close();
        },
        (error) => {
          this.layoutService.updatePreloaderState('hide');
          this.as.error(error, 5000);
        });
    } else {
      this.cs.edit(this.tareaActual).subscribe(
        (data) => {
          this.layoutService.updatePreloaderState('hide');
          this.as.success('Tarea actualizada correctamente.', 3000);
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
