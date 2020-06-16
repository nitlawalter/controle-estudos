import { Assunto } from './assunto.model';

export class Topico {

  constructor(
      public id: number,
      public nome: string,
      public assunto: Assunto
  ){}

}
