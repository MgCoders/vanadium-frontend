import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { DialogOverviewExampleDialogComponent } from '../../ui/components/dialog-overview-example-dialog.component';
import { TipoTarea } from '../../_models/models'

@Component({
  selector: 'app-alta-tarea',
  templateUrl: './alta-tarea.component.html',
  styleUrls: ['./alta-tarea.component.scss']
})
export class AltaTareaComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AltaTareaComponent>,
              @Inject(MAT_DIALOG_DATA) public data: [TipoTarea]) { }

  ngOnInit() { 

  }
}
