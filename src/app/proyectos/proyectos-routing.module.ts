import { Routes, RouterModule } from '@angular/router';
import { ListaProyectosComponent } from './lista-proyectos/lista-proyectos.component';
import { AltaProyectoComponent } from './alta-proyecto/alta-proyecto.component';
import { ProyectosComponent } from './proyectos.component';

export const ProyectosRoutes: Routes = [
  {
    path: '',
    component: ProyectosComponent,
    children: [
      { path: '', redirectTo: '/app/dashboard', pathMatch: 'full' },
      { path: 'lista', component: ListaProyectosComponent },
      { path: 'alta', component: AltaProyectoComponent },
    ]
  }
];

export const ProyectosRoutingModule = RouterModule.forChild(ProyectosRoutes);
