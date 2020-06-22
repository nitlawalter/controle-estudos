import { Usuario } from 'src/app/model/usuario.model';

export class Meta {

    constructor(
        public id: number,
        public nome: string,
        public dia: string,
        public finalizada: boolean,
        public estudo: string,
        public usuario: Usuario
    ){}

}
