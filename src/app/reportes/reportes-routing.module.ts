import {
  RouterModule,
  Routes
} from '@angular/router';

import { ReportesComponent } from './reportes.component';
import { HorasEstimadasVsCargadasComponent } from './horas-estimadas-vs-cargadas/horas-estimadas-vs-cargadascomponent';
import { AdminGuard } from '../_guards/admin.guard';

export const ReportesRoutes: Routes = [
  {
    path: '',
    component: ReportesComponent,
    canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: '/app/dashboard', pathMatch: 'full' },
      {path: 'horas-estimadas-vs-cargadas', component: HorasEstimadasVsCargadasComponent},
    ]
  }
];

export const ReportesRoutingModule = RouterModule.forChild(ReportesRoutes);
