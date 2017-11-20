import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MatIconModule,
  MatButtonModule
} from '@angular/material';
import { CargosComponent } from './cargos.component';
import { ListaCargosComponent } from './lista-cargos/lista-cargos.component';
import { AltaCargoComponent } from './alta-cargo/alta-cargo.component';
import { CargosRoutingModule } from './cargos-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CargosRoutingModule,
    MatIconModule,
    MatButtonModule
  ],
  declarations: [CargosComponent, ListaCargosComponent, AltaCargoComponent]
})
export class CargosModule { }
