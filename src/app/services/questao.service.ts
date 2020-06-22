import { HOST_API } from './host.api';
import { Questao } from 'src/app/model/questao.model';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class QuestaoService {

  constructor(private http: HttpClient) { }

  inserirOuEditar(obj: Questao) {
    if(obj.id != null) {
      return this.http.put(`${HOST_API}/api/questoes`, obj);
    }else{
      obj.id = null;
      return this.http.post(`${HOST_API}/api/questoes`, obj);
    }
  }

  findAll(){
    return this.http.get(`${HOST_API}/api/questoes`);
  }

  findPage(page: number, size: number){
    return this.http.get(`${HOST_API}/api/questoes/${page}/${size}`);
  }

  findById(id: number){
    return this.http.get(`${HOST_API}/api/questoes/${id}`);
  }

  findByTopicoAssuntoId(id: number){
    return this.http.get(`${HOST_API}/api/questoes/topico/assunto/${id}`);
  }

  findByTopicoAssuntoIdAndUsuario(idAssunto: number, idUsuario: number){
    return this.http.get(`${HOST_API}/api/questoes/topico/assuntoAndUsuario/${idAssunto}/${idUsuario}`);
  }

  findByTopicoAssuntoDisciplinaIdAndUsuario(id: number, idUsuario: number){
    return this.http.get(`${HOST_API}/api/questoes/topico/assunto/disciplinaAndUsuario/${id}/${idUsuario}`);
  }

  deletar(id: number){
    return this.http.delete(`${HOST_API}/api/questoes/${id}`);
  }
}
