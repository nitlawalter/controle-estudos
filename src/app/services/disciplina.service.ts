import { HOST_API } from './host.api';
import { Disciplina } from "./../model/Disciplina";
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {

  constructor(private http: HttpClient) { }

  inserirOuEditar(obj:Disciplina) {
    console.log('inserindo disciplina: ' + obj);
    if(obj.id != null && obj.id != '') {
      console.log('ALTERAR DISCIPLINA: ' + obj);
      return this.http.put(`${HOST_API}/api/disciplinas`, obj);
    }else{
      console.log('INSERIR DISCIPLINA: ' + obj);
      obj.id = null;
      return this.http.post(`${HOST_API}/api/disciplinas`, obj);
    }
  }

  findAll(){
    return this.http.get(`${HOST_API}/api/disciplinas`);
  }

  findPage(page:number, size:number){
    return this.http.get(`${HOST_API}/api/disciplinas/${page}/${size}`);
  }

  findById(id:number){
    return this.http.get(`${HOST_API}/api/disciplinas/${id}`);
  }

  deletar(id:number){
    return this.http.delete(`${HOST_API}/api/disciplinas/${id}`);

  }
}
