import { Component, OnInit } from '@angular/core';
import { ColaboradorService } from '../../_services/colaborador.service';
import { Colaborador } from '../../_models/Colaborador';

@Component({
  selector: 'app-lista-colaboradores',
  templateUrl: './lista-colaboradores.component.html',
  styleUrls: ['./lista-colaboradores.component.scss']
})
export class ListaColaboradoresComponent implements OnInit {

  colaboradores: Colaborador[];

  constructor(private colaboradorService: ColaboradorService) { }

  ngOnInit() {
    this.colaboradorService.getColaboradores().subscribe((data) => this.colaboradores = data);
  }

}
