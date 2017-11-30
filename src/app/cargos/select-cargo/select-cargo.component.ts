import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CargoService } from '../../_services/cargo.service';
import { AlertService } from '../../_services/alert.service';
import { Cargo } from '../../_models/models';

@Component({
  selector: 'app-select-cargo',
  templateUrl: './select-cargo.component.html',
  styleUrls: ['./select-cargo.component.scss']
})
export class SelectCargoComponent implements OnInit {

  @Input() object: any;
  @Input() idModel: string;
  @Input() placeHolder: string;
  @Input() id: string;
  @Input() desc: string;

  @Output() onChange: EventEmitter<Cargo> = new EventEmitter<Cargo>();

  private lista: Cargo[];

  constructor(private cs: CargoService,
              /* private as: AlertService */) { }

  ngOnInit() {
    this.lista = new Array();
    this.cs.getAll().subscribe(
      (data) => {
        this.lista = data;
      },
      (error) => {
        /* this.as.error(error, 5000); */
      });
  }

  onChangeValue(evt: Cargo) {
    this.onChange.emit(evt);
  }
}
