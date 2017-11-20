import { Routes, RouterModule } from '@angular/router';

import { ListaCargosComponent } from './lista-cargos/lista-cargos.component';
import { AltaCargoComponent } from './alta-cargo/alta-cargo.component';
import { CargosComponent } from './cargos.component';

export const CargosRoutes: Routes = [
  {
    path: '',
    component: CargosComponent,
    children: [
      { path: '', redirectTo: '/app/dashboard', pathMatch: 'full' },
      { path: 'lista', component: ListaCargosComponent },
      { path: 'alta', component: AltaCargoComponent },
    ]
  }
];

export const CargosRoutingModule = RouterModule.forChild(CargosRoutes);
