import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorasComponent } from './horas.component';
import { ListaHorasComponent } from './lista-horas/lista-horas.component';
import { HorasRoutingModule } from './horas-routing.module';
import {
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatSnackBarModule,
  MatSelectModule,
  MatTooltipModule,
  MatToolbarModule,
  MatDatepickerModule
} from '@angular/material';

import { ColaboradoresModule } from '../colaboradores/colaboradores.module';

@NgModule({
  imports: [
    CommonModule,
    HorasRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    MatSelectModule,
    MatTooltipModule,
    MatToolbarModule,
    MatDatepickerModule,
    ColaboradoresModule
  ],
  declarations: [HorasComponent, ListaHorasComponent]
})
export class HorasModule { }
