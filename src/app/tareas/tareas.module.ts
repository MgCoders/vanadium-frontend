import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaTareasComponent } from './lista-tareas/lista-tareas.component';
import { SelectTareaComponent } from './select-tarea/select-tarea.component';
import { AltaTareaComponent } from './alta-tarea/alta-tarea.component';
import {
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatSnackBarModule,
  MatSelectModule,
  MatTooltipModule
} from '@angular/material';
import { TareasComponent } from './tareas.component';
import { TareasRoutingModule } from './tareas-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TareasRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    MatSelectModule,
    MatTooltipModule
  ],
  declarations: [TareasComponent, ListaTareasComponent, SelectTareaComponent, AltaTareaComponent]
})
export class TareasModule { }
