import { NgModule } from '@angular/core';

import { EChartsDirective } from './echarts.directive';
import { SlimScrollDirective } from './slim-scroll.directive';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';

import {
  MatDialogModule,
  MatButtonModule
} from '@angular/material';

@NgModule({
  imports: [
    MatDialogModule,
    MatButtonModule,
  ],
  declarations: [
    EChartsDirective,
    SlimScrollDirective,
    DialogConfirmComponent,
  ],
  exports: [
    EChartsDirective,
    SlimScrollDirective,
    DialogConfirmComponent,
  ],

  entryComponents: [
    DialogConfirmComponent,
  ]
})

export class SharedModule {}
