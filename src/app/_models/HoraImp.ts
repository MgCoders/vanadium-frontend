import * as models from './models';

export class HoraImp implements models.Hora {
    id?: number;

    dia: string;

    horaIn: string;

    horaOut: string;

    subtotal?: string;

    proyecto: models.Proyecto;

    tipoTarea: models.TipoTarea;

    colaborador: models.Colaborador;

    constructor(x: models.Hora) {
        this.id = x.id;
        this.dia = x.dia;
        this.horaIn = x.horaIn;
        this.horaOut = x.horaOut;
        this.subtotal = x.subtotal;
        this.proyecto = x.proyecto;
        this.tipoTarea = x.tipoTarea;
        this.colaborador = x.colaborador;
    }
}
