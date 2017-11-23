import { Routes, RouterModule } from '@angular/router';

import { HorasComponent } from './horas.component';
import { ListaHorasComponent } from './lista-horas/lista-horas.component';

export const HorasRoutes: Routes = [
  {
    path: '',
    component: HorasComponent,
    children: [
      { path: '', redirectTo: '/app/dashboard', pathMatch: 'full' },
      { path: 'listahoras', component: ListaHorasComponent },
    ]
  }
];

export const HorasRoutingModule = RouterModule.forChild(HorasRoutes);
