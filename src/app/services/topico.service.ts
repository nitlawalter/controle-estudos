import { HOST_API } from './host.api';
import { Topico } from 'src/app/model/topico.model';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TopicoService {

  constructor(private http: HttpClient) { }

  inserirOuEditar(obj: Topico) {
    if(obj.id != null) {
      return this.http.put(`${HOST_API}/api/topicos`, obj);
    }else{
      obj.id = null;
      return this.http.post(`${HOST_API}/api/topicos`, obj);
    }
  }

  findAll(){
    return this.http.get(`${HOST_API}/api/topicos`);
  }

  findTopicosByAssunto(id: number){
    return this.http.get(`${HOST_API}/api/topicos/assunto/${id}`);
  }

  findPage(page: number, size: number){
    return this.http.get(`${HOST_API}/api/topicos/${page}/${size}`);
  }

  findById(id: number){
    return this.http.get(`${HOST_API}/api/topicos/${id}`);
  }

  deletar(id: number){
    return this.http.delete(`${HOST_API}/api/topicos/${id}`);
  }
}
