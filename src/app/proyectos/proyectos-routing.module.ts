import { Routes, RouterModule } from '@angular/router';

import { AltaProyectoComponent } from './alta-proyecto/alta-proyecto.component';
import { VerProyectosComponent } from './ver-proyectos/ver-proyectos.component';
import { ProyectosComponent } from './proyectos.component';

export const ProyectosRoutes: Routes = [
  {
    path: '',
    component: ProyectosComponent,
    children: [
      { path: '', redirectTo: '/app/dashboard', pathMatch: 'full' },
      { path: 'alta', component: AltaProyectoComponent },
      { path: 'ver', component: VerProyectosComponent },
    ]
  }
];

export const ProyectosRoutingModule = RouterModule.forChild(ProyectosRoutes);
