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
  MatToolbarModule,
  MatDatepickerModule,
  MatSliderModule
} from '@angular/material';

import { HorasComponent } from './horas.component';
import { HorasRoutingModule } from './horas-routing.module';
import { ListaHorasComponent } from './lista-horas/lista-horas.component';

import { ColaboradoresModule } from '../colaboradores/colaboradores.module';
import { ProyectosModule } from '../proyectos/proyectos.module';
import { TareasModule } from '../tareas/tareas.module';
import { SelectHoraDesdeComponent } from './select-hora-desde/select-hora-desde.component';
import { SelectHoraHastaComponent } from './select-hora-hasta/select-hora-hasta.component';

import { HoraService } from '../_services/hora.service';
import { AlertService } from '../_services/alert.service';
import { LayoutService } from '../layout/layout.service';

@NgModule({
  imports: [
    FormsModule,
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
    MatSliderModule,
    ColaboradoresModule,
    ProyectosModule,
    TareasModule
  ],

  declarations: [
    HorasComponent,
    ListaHorasComponent,
    SelectHoraDesdeComponent,
    SelectHoraHastaComponent
  ],

  providers: [
    HoraService,
    AlertService,
    LayoutService
  ],
})
export class HorasModule { }
