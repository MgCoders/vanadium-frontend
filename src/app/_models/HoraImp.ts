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
}
