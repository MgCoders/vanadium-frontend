import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AlertService } from '../../_services/alert.service';
import { strictEqual } from 'assert';

@Component({
  selector: 'app-select-hora-desde',
  templateUrl: './select-hora-desde.component.html',
  styleUrls: ['./select-hora-desde.component.scss']
})
export class SelectHoraDesdeComponent implements OnInit {

  @Input() object: any;
  @Input() idModel: string;
  @Input() placeHolder: string;

  @Output() onChange: EventEmitter<{id: number, desc: string, hora: string}> = new EventEmitter<{id: number, desc: string, hora: string}>();

  public lista: any[];
  public hourdiv: number;

  constructor(private as: AlertService) { }

  ngOnInit() {
    this.lista = new Array();
    this.hourdiv = 4;

    const iter: number = 24 * this.hourdiv;
    for (let _i = 0; _i < iter; _i++) {
      let aux: string = '';
      if (Math.floor(_i / this.hourdiv) < 10) {
        aux += '0';
      }
      aux += Math.floor(_i / this.hourdiv).toString();

      aux += ':';

      if ((_i % this.hourdiv) * (60 / this.hourdiv) < 10) {
        aux += '0';
      }
      aux += ((_i % this.hourdiv) * (60 / this.hourdiv)).toString();

      this.lista.push({id: _i, desc: aux, hora: aux});
    }
  }

  onChangeValue(evt) {
    this.onChange.emit(this.lista.find((x) => x.hora === evt.value));
  }
}
