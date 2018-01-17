import * as models from './models';

export class HoraImp implements models.Hora {
    id?: number;

    dia: string;

    horaIn: string;

    horaOut: string;

    subtotal?: string;

    colaborador: models.Colaborador;

    horaDetalleList?: models.HoraDetalle[];

    completa?: boolean;

    subtotalDetalles?: string;

    constructor(x: models.Hora) {
        this.id = x.id;
        this.dia = x.dia;
        this.horaIn = x.horaIn;
        this.horaOut = x.horaOut;
        this.subtotal = x.subtotal;
        this.colaborador = x.colaborador;
        this.completa = x.completa;
        this.subtotalDetalles = x.subtotalDetalles;

        this.horaDetalleList = new Array();
        x.horaDetalleList.forEach((y) => {
            this.horaDetalleList.push(new models.HoraDetalleImp(y));
        });
    }
}
