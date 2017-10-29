import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AltaProyectoComponent } from './alta-proyecto/alta-proyecto.component';
import { VerProyectosComponent } from './ver-proyectos/ver-proyectos.component';
import { ProyectosRoutingModule } from './proyectos-routing.module';
import { ProyectosComponent } from './proyectos.component';

@NgModule({
  imports: [
    CommonModule,
    ProyectosRoutingModule
  ],
  declarations: [ProyectosComponent, AltaProyectoComponent, VerProyectosComponent]
})
export class ProyectosModule { }
