import { Pipe, PipeTransform } from '@angular/core';
import { ValueTransformer } from '@angular/compiler/src/util';
import { format } from 'url';

@Pipe({name: 'myDatePipe'})
export class CustomDatePipe implements PipeTransform {
  transform(value: string, args: string[]): any {
    if (!value) { return value; }

    const aux: string[] = value.split('-');
    return new Date(+aux[2], +aux[1] - 1, +aux[0]);
  }
}
