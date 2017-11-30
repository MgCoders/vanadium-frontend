import { Component, OnInit } from '@angular/core';
import { SelectCargoComponent } from '../../cargos/select-cargo/select-cargo.component';
import { Cargo, Colaborador } from '../../_models/models';

@Component({
  selector: 'app-alta-colaborador',
  templateUrl: './alta-colaborador.component.html',
  styleUrls: ['./alta-colaborador.component.scss']
})
export class AltaColaboradorComponent implements OnInit {

  private colaboradorActual: Colaborador;

  constructor() { }

  ngOnInit() {
    this.colaboradorActual = {} as Colaborador;
    this.colaboradorActual.cargo = {} as Cargo;
  }

}
