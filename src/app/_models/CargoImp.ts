import * as models from './models';

export class CargoImp implements models.Cargo {

    id?: number;

    nombre: string;

    codigo: string;

    precioHoraHistoria?: models.PrecioHora[];

    public constructor(x: models.Cargo) {
        this.id = x.id;
        this.nombre = x.nombre;
        this.codigo = x.codigo;

        this.precioHoraHistoria = new Array();
        x.precioHoraHistoria.forEach((y) => {
            this.precioHoraHistoria.push(new models.PrecioHoraImp(y));
        });
    }
}
