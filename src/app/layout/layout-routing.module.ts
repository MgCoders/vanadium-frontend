import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AuthGuard } from '../_guards/auth.guard';

const routes: Routes = [
  {
    path: 'app',
    canActivate: [AuthGuard],
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: '/app/dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'cargos', loadChildren: '../cargos/cargos.module#CargosModule' },
      { path: 'colaboradores', loadChildren: '../colaboradores/colaboradores.module#ColaboradoresModule' },

    ]
  }
];

export const LayoutRoutingModule = RouterModule.forChild(routes);
