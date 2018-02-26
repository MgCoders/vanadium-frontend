import {
  RouterModule,
  Routes
} from '@angular/router';

import { ReportesComponent } from './reportes.component';
import { HorasEstimadasVsCargadasComponent } from './horas-estimadas-vs-cargadas/horas-estimadas-vs-cargadascomponent';
import { HistoricoHorasComponent } from './historico-horas/historico-horas.component';
import { MisHorasComponent } from './mis-horas/mis-horas.component';
import { AdminGuard } from '../_guards/admin.guard';

export const ReportesRoutes: Routes = [
  {
    path: '',
    component: ReportesComponent,
    children: [
      {
        path: '',
        redirectTo: '/app/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'horas-estimadas-vs-cargadas',
        component: HorasEstimadasVsCargadasComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'historico-horas',
        component: HistoricoHorasComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'mis-horas',
        component: MisHorasComponent
      },
    ]
  }
];

export const ReportesRoutingModule = RouterModule.forChild(ReportesRoutes);
