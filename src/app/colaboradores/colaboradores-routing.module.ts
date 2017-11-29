import { Routes, RouterModule } from '@angular/router';

import { ListaColaboradoresComponent } from './lista-colaboradores/lista-colaboradores.component';
import { AltaColaboradorComponent } from './alta-colaborador/alta-colaborador.component';
import { ColaboradoresComponent } from './colaboradores.component';
import { AuthGuard } from '../_guards/auth.guard';
import { AdminGuard } from '../_guards/admin.guard';

export const ColaboradoresRoutes: Routes = [
  {
    path: '',
    component: ColaboradoresComponent,
    canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: '/app/dashboard', pathMatch: 'full' },
      { path: 'listacolaboradores', component: ListaColaboradoresComponent, canActivate: [AuthGuard] },
      { path: 'altacolaborador', component: AltaColaboradorComponent },
    ]
  }
];

export const ColaboradoresRoutingModule = RouterModule.forChild(ColaboradoresRoutes);
