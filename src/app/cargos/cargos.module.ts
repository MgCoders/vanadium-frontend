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

import { CargosComponent } from './cargos.component';
import { CargosRoutingModule } from './cargos-routing.module';
import { ListaCargosComponent } from './lista-cargos/lista-cargos.component';
import { AltaCargoComponent } from './alta-cargo/alta-cargo.component';
import { SelectCargoComponent } from './select-cargo/select-cargo.component';

import { CargoService } from '../_services/cargo.service';
import { AlertService } from '../_services/alert.service';
import { LayoutService } from '../layout/layout.service';
import { HistoricoPrecioCargoComponent } from './historico-precio-cargo/historico-precio-cargo.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    CargosRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    MatSelectModule,
    MatTooltipModule,
    MatDialogModule,
  ],

  exports: [
    SelectCargoComponent,
  ],

  declarations: [
    CargosComponent,
    ListaCargosComponent,
    AltaCargoComponent,
    SelectCargoComponent,
    HistoricoPrecioCargoComponent
  ],

  providers: [
    CargoService,
    AlertService,
    LayoutService
  ],

  entryComponents: [
    AltaCargoComponent
  ],
})
export class CargosModule { }
