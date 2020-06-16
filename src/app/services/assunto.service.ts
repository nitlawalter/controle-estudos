import { HOST_API } from './host.api';
import { Assunto } from 'src/app/model/assunto.model';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AssuntoService {

  constructor(private http: HttpClient) { }

  inserirOuEditar(obj: Assunto) {    
    if(obj.id != null) {      
      return this.http.put(`${HOST_API}/api/assuntos`, obj);
    }else{
      obj.id = null;
      return this.http.post(`${HOST_API}/api/assuntos`, obj);
    }
  }

  findAll(){
    return this.http.get(`${HOST_API}/api/assuntos`);
  }

  findPage(page: number, size: number){
    return this.http.get(`${HOST_API}/api/assuntos/${page}/${size}`);
  }

  findById(id: number){
    return this.http.get(`${HOST_API}/api/assuntos/${id}`);
  }

  findAssuntosByDisciplina(id: number){
    return this.http.get(`${HOST_API}/api/assuntos/disciplina/${id}`);
  }

  deletar(id: number){
    return this.http.delete(`${HOST_API}/api/assuntos/${id}`);
  }
}
