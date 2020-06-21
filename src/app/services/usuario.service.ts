import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HOST_API } from './host.api';
import { Usuario } from '../model/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

   constructor(private http: HttpClient) { }

   login(user: Usuario){
    return this.http.post(`${HOST_API}/api/auth`, user);
  }

  inserirOuEditar(obj: Usuario) {
    if (obj.id != null) {
      return this.http.put(`${HOST_API}/api/usuarios`, obj);
    }else{
      obj.id = null;
      return this.http.post(`${HOST_API}/api/usuarios`, obj);
    }
  }

  findAll(){
    return this.http.get(`${HOST_API}/api/usuarios`);
  }

  findPage(page: number, size: number){
    return this.http.get(`${HOST_API}/api/usuarios/${page}/${size}`);
  }

  findById(id: number){
    return this.http.get(`${HOST_API}/api/usuarios/${id}`);
  }

  findusuariosByDisciplina(email: string){
    return this.http.get(`${HOST_API}/api/usuarios/email/${email}`);
  }

  deletar(id: number){
    return this.http.delete(`${HOST_API}/api/usuarios/${id}`);
  }
}
