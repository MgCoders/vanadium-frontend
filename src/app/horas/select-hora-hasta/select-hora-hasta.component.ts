import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AlertService } from '../../_services/alert.service';

@Component({
  selector: 'app-select-hora-hasta',
  templateUrl: './select-hora-hasta.component.html',
  styleUrls: ['./select-hora-hasta.component.scss']
})
export class SelectHoraHastaComponent implements OnInit {

  @Input() object: any;
  @Input() idModel: string;
  @Input() placeHolder: string;

  @Output() onChange: EventEmitter<number> = new EventEmitter<number>();

  private lista: any[];
  private hourdiv: number;

  constructor(private as: AlertService) { }

  ngOnInit() {
    this.lista = new Array();
    this.hourdiv = 4;
    this.loadValues(0);
  }

  public loadValues(desde: number) {
    this.lista = new Array();

    const iter: number = 24 * this.hourdiv;
    for (let _i = desde; _i < iter; _i++) {

      const dif: number = _i - desde;
      const horasTotales: string = (Math.floor((_i - desde) / this.hourdiv)).toString();
      const minutosTotales: string = (Math.floor((_i - desde) % this.hourdiv) * (60 / this.hourdiv)).toString();

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

      aux += ' (' + horasTotales + 'h. ' + minutosTotales + 'm.)';

      this.lista.push({id: _i, desc: aux});
    }
  }

  onChangeValue(evt) {
    this.onChange.emit(evt);
  }
}
