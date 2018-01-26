import { Routes, RouterModule } from '@angular/router';

import { EstimacionesComponent } from './estimaciones.component';
import { AdminGuard } from '../_guards/admin.guard';
import { ListaEstimacionesComponent } from './lista-estimaciones/lista-estimaciones.component';

export const EstimacionesRoutes: Routes = [
  {
    path: '',
    component: EstimacionesComponent,
    canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: '/app/dashboard', pathMatch: 'full' },
      { path: 'listaestimaciones', component: ListaEstimacionesComponent },
    ]
  }
];

export const EstimacionesRoutingModule = RouterModule.forChild(EstimacionesRoutes);
