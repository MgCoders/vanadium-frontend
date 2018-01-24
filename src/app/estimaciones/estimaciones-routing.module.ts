import { Routes, RouterModule } from '@angular/router';

import { EstimacionesComponent } from './estimaciones.component';

export const EstimacionesRoutes: Routes = [
  {
    path: '',
    component: EstimacionesComponent,
    children: [
      { path: '', redirectTo: '/app/dashboard', pathMatch: 'full' },
    ]
  }
];

export const EstimacionesRoutingModule = RouterModule.forChild(EstimacionesRoutes);
