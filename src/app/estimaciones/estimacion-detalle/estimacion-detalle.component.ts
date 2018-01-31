import { Component, OnInit } from '@angular/core';
import { EstimacionService } from '../../_services/estimacion.service';
import { CargoService } from '../../_services/cargo.service';
import { TareaService } from '../../_services/tarea.service';
import { AlertService } from '../../_services/alert.service';
import {
  Estimacion,
  EstimacionCargo,
  EstimacionTipoTarea,
  Proyecto,
  Cargo,
  TipoTarea
} from '../../_models/models';
import { LayoutService } from '../../layout/layout.service';
import { ActivatedRoute } from '@angular/router';
import { EstimacionImp } from '../../_models/EstimacionImp';

@Component({
  selector: 'app-estimacion-detalle',
  templateUrl: './estimacion-detalle.component.html',
  styleUrls: ['./estimacion-detalle.component.scss']
})
export class EstimacionDetalleComponent implements OnInit {

  public idEstimacionActual: number;
  public estimacionActual: Estimacion;
  public editando: boolean;
  public cargos: Cargo[];
  public tareas: TipoTarea[];
  public estCargo: EstimacionCargo[];

  constructor(private service: EstimacionService,
              private serviceC: CargoService,
              private serviceT: TareaService,
              private as: AlertService,
              private route: ActivatedRoute,
              private layoutService: LayoutService) { }

  ngOnInit() {
    this.editando = false;
    this.estCargo = new Array();
    this.route.params.subscribe((params) => {
      this.idEstimacionActual = +params['id'];
      this.layoutService.updatePreloaderState('active');
      this.serviceC.getAll().subscribe(
        (datac) => {
          this.cargos = datac;
          this.serviceT.getAll().subscribe(
            (datat) => {
              this.tareas = datat;
              this.LoadEstimacion();
            },
            (error) => {
              this.as.error(error, 5000);
              this.layoutService.updatePreloaderState('hide');
            });
        },
        (error) => {
          this.as.error(error, 5000);
          this.layoutService.updatePreloaderState('hide');
        });
      this.LoadEstimacion();
    });
  }

  LoadEstimacion() {
    this.layoutService.updatePreloaderState('active');
    this.service.get(this.idEstimacionActual).subscribe(
      (data) => {
        this.estimacionActual = data;

        if (this.estimacionActual.estimacionCargos === undefined) {
          this.estimacionActual.estimacionCargos = new Array();
        }
/*         this.cargos.forEach((x) => {
          this.tareas.forEach((t) => {

          });
        }); */

        this.layoutService.updatePreloaderState('hide');
      },
      (error) => {
        this.layoutService.updatePreloaderState('hide');
        this.as.error(error, 5000);
      });
  }

  Editar() {
    this.editando = true;
  }

  GuardarOnClick() {

  }

  Cancelar() {
    this.editando = false;
  }

}
