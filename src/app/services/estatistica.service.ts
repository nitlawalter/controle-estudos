import { HOST_API } from './host.api';
import { Estatistica } from 'src/app/model/estatistica.model';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EstatisticaService {

  constructor(private http: HttpClient) { }

  inserirOuEditar(obj: Estatistica) {
    if(obj.id != null) {
      return this.http.put(`${HOST_API}/api/estatisticas`, obj);
    }else{
      obj.id = null;
      return this.http.post(`${HOST_API}/api/estatisticas`, obj);
    }
  }

  findAll(){
    return this.http.get(`${HOST_API}/api/estatisticas`);
  }

  findPage(page: number, size: number){
    return this.http.get(`${HOST_API}/api/estatisticas/${page}/${size}`);
  }

  findById(id: number){
    return this.http.get(`${HOST_API}/api/estatisticas/${id}`);
  }

  deletar(id: number){
    return this.http.delete(`${HOST_API}/api/estatisticas/${id}`);
  }
}
