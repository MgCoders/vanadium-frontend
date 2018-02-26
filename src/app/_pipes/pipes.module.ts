import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimePipe } from './time.pipe';
import { CustomDatePipe } from './customDate.pipe';

@NgModule({
  imports: [
    CommonModule,
  ],

  declarations: [
    TimePipe,
    CustomDatePipe
  ],

  exports: [
    TimePipe,
    CustomDatePipe
  ],

  providers: [
    TimePipe,
    CustomDatePipe
]
})
export class PipesModule { }
