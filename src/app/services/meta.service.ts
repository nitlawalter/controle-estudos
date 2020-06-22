import { HOST_API } from './host.api';
import { Meta } from 'src/app/model/meta.model';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MetaService {

  constructor(private http: HttpClient) { }

  inserirOuEditar(obj: Meta) {
    if(obj.id != null) {
      return this.http.put(`${HOST_API}/api/metas`, obj);
    }else{
      obj.id = null;
      return this.http.post(`${HOST_API}/api/metas`, obj);
    }
  }

  findAll(){
    return this.http.get(`${HOST_API}/api/metas`);
  }

  findPage(page: number, size: number){
    return this.http.get(`${HOST_API}/api/metas/${page}/${size}`);
  }

  findById(id: number){
    return this.http.get(`${HOST_API}/api/metas/${id}`);
  }

  findMetasByDia(dia: string){
    return this.http.get(`${HOST_API}/api/metas/dia/${dia}`);
  }

  findMetasByDiaAndUsuario(dia: string, idUsuario: number){
    return this.http.get(`${HOST_API}/api/metas/diaAndUsuario/${dia}/${idUsuario}`);
  }

  deletar(id: number){
    return this.http.delete(`${HOST_API}/api/metas/${id}`);
  }
}
