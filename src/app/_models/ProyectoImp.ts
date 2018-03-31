import * as models from './models';

export class ProyectoImp implements models.Proyecto {
    id?: number;

    codigo: string;

    nombre: string;

    prioridad: number;

    enabled: boolean;

    public constructor(x: models.Proyecto) {
        this.id = x.id;
        this.nombre = x.nombre;
        this.codigo = x.codigo;
        this.prioridad = x.prioridad;
        this.enabled = x.enabled;
    }
}
