import { Assunto } from './assunto.model';

export class Estatistica {

    constructor(
        public id: number,
        public acertos: number,
        public erros: number,
        public percentual: string,
        public total: number,
        public assunto: Assunto
    ){}

}
