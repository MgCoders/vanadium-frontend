import { NgModule } from '@angular/core';
import {
  CommonModule,
  DatePipe,
  DecimalPipe
} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MatButtonModule,
  MatDatepickerModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatSliderModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatTooltipModule,
  MatDialogModule,
  MatCardModule,
} from '@angular/material';

import { EstimacionesComponent } from './estimaciones.component';
import { EstimacionesRoutingModule } from './estimaciones-routing.module';

import { ColaboradoresModule } from '../colaboradores/colaboradores.module';
import { ProyectosModule } from '../proyectos/proyectos.module';
import { TareasModule } from '../tareas/tareas.module';

import { EstimacionService } from '../_services/estimacion.service';
import { AlertService } from '../_services/alert.service';
import { LayoutService } from '../layout/layout.service';

import { TimePipe } from '../_pipes/time.pipe';
import { ListaEstimacionesComponent } from './lista-estimaciones/lista-estimaciones.component';
import { AltaEstimacionComponent } from './alta-estimacion/alta-estimacion.component';
import { EstimacionDetalleComponent } from './estimacion-detalle/estimacion-detalle.component';

import { CustomDatePipe } from '../_pipes/customDate.pipe';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    EstimacionesRoutingModule,
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
    TareasModule,
    MatDialogModule,
    MatSliderModule,
    MatCardModule,
  ],

  declarations: [
    EstimacionesComponent,
    ListaEstimacionesComponent,
    AltaEstimacionComponent,
    EstimacionDetalleComponent
  ],

  providers: [
    EstimacionService,
    AlertService,
    LayoutService,
    DatePipe,
    DecimalPipe,
    TimePipe,
    CustomDatePipe
  ],

  entryComponents: [
    AltaEstimacionComponent
  ]
})
export class EstimacionesModule { }
