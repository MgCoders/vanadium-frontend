import * as models from './models';

export class HoraImp implements models.Hora {
    id?: number;

    dia: Date;

    horaIn: Date;

    horaOut: Date;

    subtotal?: Date;

    proyecto: models.Proyecto;

    tipoTarea: models.TipoTarea;

    colaborador: models.Colaborador;

    horaInNumber: number;

    horaOutNumber: number;
}
