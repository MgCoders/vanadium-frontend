import * as models from './models';

export class CargoImp implements models.Cargo {

    id?: number;

    nombre: string;

    codigo: string;

    precioHora: number;

    public constructor(x: models.Cargo) {
        this.id = x.id;
        this.nombre = x.nombre;
        this.codigo = x.codigo;
        this.precioHora = x.precioHora;
    }
}
