import { Pipe, PipeTransform } from '@angular/core';
import { ValueTransformer } from '@angular/compiler/src/util';
import { format } from 'url';

@Pipe({name: 'myTimePipe'})
export class TimePipe implements PipeTransform {
  transform(value: string, args: string[]): any {
    if (!value) { return value; }

    let horas: string = /[0-9]+H/.exec(value) === null || /[0-9]+H/.exec(value) === undefined ? '' : /[0-9]+H/.exec(value).toString();
    let minutos: string = /[0-9]+M/.exec(value) === null || /[0-9]+M/.exec(value) === undefined ? '' : /[0-9]+M/.exec(value).toString();

    horas = horas === null || horas === undefined || horas.length === 0 ? '00' : horas.substring(0, horas.length - 1);
    minutos = minutos === null || minutos === undefined || minutos.length === 0 ? '00' : minutos.substring(0, minutos.length - 1);

    const fomrat: string = args.toString();

    if (args.toString() === 'minutos') {
        const aux: number = (+horas * 60) + +minutos;
        return aux;
    }

    return fomrat.replace('HH', horas).replace('mm', minutos);
  }
}
