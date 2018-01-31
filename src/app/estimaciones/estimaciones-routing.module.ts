import { Routes, RouterModule } from '@angular/router';

import { EstimacionesComponent } from './estimaciones.component';
import { AdminGuard } from '../_guards/admin.guard';
import { ListaEstimacionesComponent } from './lista-estimaciones/lista-estimaciones.component';
import { EstimacionDetalleComponent } from './estimacion-detalle/estimacion-detalle.component';

export const EstimacionesRoutes: Routes = [
  {
    path: '',
    component: EstimacionesComponent,
    canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: '/app/dashboard', pathMatch: 'full' },
      { path: 'listaestimaciones', component: ListaEstimacionesComponent },
      { path: 'detalle/:id', component: EstimacionDetalleComponent },
    ]
  }
];

export const EstimacionesRoutingModule = RouterModule.forChild(EstimacionesRoutes);
