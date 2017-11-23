import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaColaboradoresComponent } from './lista-colaboradores/lista-colaboradores.component';
import { AltaColaboradorComponent } from './alta-colaborador/alta-colaborador.component';
import { SelectColaboradorComponent } from './select-colaborador/select-colaborador.component';
import { ColaboradoresComponent } from './colaboradores.component';
import { ColaboradoresRoutingModule } from './colaboradores-routing.module';
import { CargosModule } from '../cargos/cargos.module';
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
    ColaboradoresRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    MatSelectModule,
    MatTooltipModule,
    CargosModule,
  ],
  declarations: [ColaboradoresComponent, ListaColaboradoresComponent, AltaColaboradorComponent, SelectColaboradorComponent],
  exports:[SelectColaboradorComponent]
})
export class ColaboradoresModule { }
