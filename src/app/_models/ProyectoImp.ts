import * as models from './models';

export class ProyectoImp implements models.Proyecto {
    id?: number;

    codigo: string;

    nombre: string;

    public constructor(x: models.TipoTarea) {
        this.id = x.id;
        this.nombre = x.nombre;
        this.codigo = x.codigo;
    }
}
