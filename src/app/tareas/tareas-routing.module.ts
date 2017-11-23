import { Routes, RouterModule } from '@angular/router';

import { ListaTareasComponent } from './lista-tareas/lista-tareas.component';
import { AltaTareaComponent } from './alta-tarea/alta-tarea.component';
import { TareasComponent } from './tareas.component';

export const TareasRoutes: Routes = [
  {
    path: '',
    component: TareasComponent,
    children: [
      { path: '', redirectTo: '/app/dashboard', pathMatch: 'full' },
      { path: 'lista', component: ListaTareasComponent },
      { path: 'alta', component: AltaTareaComponent },
    ]
  }
];

export const TareasRoutingModule = RouterModule.forChild(TareasRoutes);
