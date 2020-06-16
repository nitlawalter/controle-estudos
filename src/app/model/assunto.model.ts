import { Disciplina } from 'src/app/model/disciplina.model';

export class Assunto {

    constructor(
        public id: number,
        public nome: string,
        public disciplina: Disciplina
    ){}

}
