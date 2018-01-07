import { Routes, RouterModule } from '@angular/router';

import { ReportesComponent } from './reportes.component';

import { TableResponsiveComponent } from './responsive/responsive.component';
import { HorasReporteComponent } from './static/horas-reporte.component';
import { TableDataTableComponent } from './data-table/data-table.component';
import { AdminGuard } from '../_guards/admin.guard';

export const ReportesRoutes: Routes = [
  {
    path: '',
    component: ReportesComponent,
    canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: '/app/dashboard', pathMatch: 'full' },
      { path: 'responsive', component: TableResponsiveComponent },
      { path: 'static', component: HorasReporteComponent },
      { path: 'data-table', component: TableDataTableComponent },
    ]
  }
];

export const ReportesRoutingModule = RouterModule.forChild(ReportesRoutes);
