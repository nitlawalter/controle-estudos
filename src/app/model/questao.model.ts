import { Topico } from './topico.model';

export class Questao {

    constructor(
        public id: number,
        public questao: string,
        public comentario: string,
        public resumo: string,
        public gabarito: string,
        public topico: Topico,
        public revisao: boolean
    ){}

}
