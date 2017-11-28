import { Routes, RouterModule } from '@angular/router';

import { ListaCargosComponent } from './lista-cargos/lista-cargos.component';
import { AltaCargoComponent } from './alta-cargo/alta-cargo.component';
import { CargosComponent } from './cargos.component';
import { AdminGuard } from '../_guards/admin.guard';

export const CargosRoutes: Routes = [
  {
    path: '',
    component: CargosComponent,
    canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: '/app/dashboard', pathMatch: 'full' },
      { path: 'lista', component: ListaCargosComponent },
      { path: 'alta', component: AltaCargoComponent },
    ]
  }
];

export const CargosRoutingModule = RouterModule.forChild(CargosRoutes);
