import { NgModule } from '@angular/core';

import { EChartsDirective } from './echarts.directive';
import { SlimScrollDirective } from './slim-scroll.directive';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';

import {
  MatDialogModule,
  MatButtonModule
} from '@angular/material';

import { DisableControlDirective } from '../_directives/disable-control.directive';

@NgModule({
  imports: [
    MatDialogModule,
    MatButtonModule,
  ],
  declarations: [
    EChartsDirective,
    SlimScrollDirective,
    DialogConfirmComponent,
    DisableControlDirective
  ],
  exports: [
    EChartsDirective,
    SlimScrollDirective,
    DialogConfirmComponent,
    DisableControlDirective
  ],

  entryComponents: [
    DialogConfirmComponent,
  ]
})

export class SharedModule {}
