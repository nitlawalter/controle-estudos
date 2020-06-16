import { HOST_API } from './host.api';
import { Disciplina } from 'src/app/model/disciplina.model';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {

  constructor(private http: HttpClient) { }

  inserirOuEditar(obj: Disciplina) {    
    if(obj.id != null) {
      return this.http.put(`${HOST_API}/api/disciplinas`, obj);
    }else{
      obj.id = null;
      return this.http.post(`${HOST_API}/api/disciplinas`, obj);
    }
  }

  findAll(){
    return this.http.get(`${HOST_API}/api/disciplinas`);
  }

  findPage(page: number, size: number){
    return this.http.get(`${HOST_API}/api/disciplinas/${page}/${size}`);
  }

  findById(id: number){
    return this.http.get(`${HOST_API}/api/disciplinas/${id}`);
  }

  deletar(id: number){
    return this.http.delete(`${HOST_API}/api/disciplinas/${id}`);
  }
}
