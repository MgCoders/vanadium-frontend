import * as models from './models';

export class TipoTareaImp implements models.TipoTarea {

    id?: number;

    nombre: string;

    codigo: string;

    public constructor(x: models.TipoTarea) {
        this.id = x.id;
        this.nombre = x.nombre;
        this.codigo = x.codigo;
    }
}
