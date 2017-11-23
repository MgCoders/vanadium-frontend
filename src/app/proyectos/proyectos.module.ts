import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AltaProyectoComponent } from './alta-proyecto/alta-proyecto.component';
import { ProyectosRoutingModule } from './proyectos-routing.module';
import { ProyectosComponent } from './proyectos.component';
import { ListaProyectosComponent } from './lista-proyectos/lista-proyectos.component';
import { SelectProyectoComponent } from './select-proyecto/select-proyecto.component';
import {
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatSnackBarModule,
  MatSelectModule,
  MatTooltipModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ProyectosRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    MatSelectModule,
    MatTooltipModule
  ],
  declarations: [ProyectosComponent, AltaProyectoComponent, ListaProyectosComponent, SelectProyectoComponent],
  exports: [SelectProyectoComponent]
})
export class ProyectosModule { }
