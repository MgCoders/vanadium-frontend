import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatSnackBarModule,
  MatSelectModule,
  MatTooltipModule
} from '@angular/material';
import { CargosComponent } from './cargos.component';
import { ListaCargosComponent } from './lista-cargos/lista-cargos.component';
import { AltaCargoComponent } from './alta-cargo/alta-cargo.component';
import { CargosRoutingModule } from './cargos-routing.module';
import { SelectCargoComponent } from './select-cargo/select-cargo.component';

@NgModule({
  imports: [
    CommonModule,
    CargosRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    MatSelectModule,
    MatTooltipModule,
  ],
  declarations: [CargosComponent, ListaCargosComponent, AltaCargoComponent, SelectCargoComponent]
})
export class CargosModule { }
