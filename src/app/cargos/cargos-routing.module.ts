import { Routes, RouterModule } from '@angular/router';

import { ListaCargosComponent } from './lista-cargos/lista-cargos.component';
import { CargosComponent } from './cargos.component';
import { AdminGuard } from '../_guards/admin.guard';
import { HistoricoPrecioCargoComponent } from './historico-precio-cargo/historico-precio-cargo.component';

export const CargosRoutes: Routes = [
  {
    path: '',
    component: CargosComponent,
    canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: '/app/dashboard', pathMatch: 'full' },
      { path: 'lista', component: ListaCargosComponent },
      { path: 'historicoprecio/:id', component: HistoricoPrecioCargoComponent },
    ]
  }
];

export const CargosRoutingModule = RouterModule.forChild(CargosRoutes);
