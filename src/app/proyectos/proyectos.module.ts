import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatSnackBarModule,
  MatSelectModule,
  MatTooltipModule,
  MatDialogModule,
} from '@angular/material';

import { AltaProyectoComponent } from './alta-proyecto/alta-proyecto.component';
import { ProyectosRoutingModule } from './proyectos-routing.module';
import { ProyectosComponent } from './proyectos.component';
import { ListaProyectosComponent } from './lista-proyectos/lista-proyectos.component';
import { SelectProyectoComponent } from './select-proyecto/select-proyecto.component';

import { ProyectoService } from '../_services/proyecto.service';
import { AlertService } from '../_services/alert.service';
import { LayoutService } from '../layout/layout.service';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ProyectosRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    MatSelectModule,
    MatTooltipModule,
    MatDialogModule,
  ],

  declarations: [
    ProyectosComponent,
    AltaProyectoComponent,
    ListaProyectosComponent,
    SelectProyectoComponent
  ],

  exports: [
    SelectProyectoComponent
  ],

  providers: [
    ProyectoService,
    AlertService,
    LayoutService,
  ],

  entryComponents: [
    AltaProyectoComponent,
  ],
})
export class ProyectosModule { }
