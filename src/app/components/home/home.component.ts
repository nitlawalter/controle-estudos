import { Component, OnInit } from '@angular/core';
import { MetaService } from 'src/app/services/meta.service';
import { ResponseApi } from './../../model/response-api';
import { Meta } from 'src/app/model/meta.model';
import { SharedService } from 'src/app/services/shared.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  listaSegunda: [];
  listaTerca: [];
  listaQuarta: [];
  listaQuinta: [];
  listaSexta: [];
  listaSabado: [];
  listaDomingo: [];

  shared: SharedService;

  constructor(private service: MetaService) {
    this.shared = SharedService.getInstance();
   }

  ngOnInit(): void {
    this.findMetasByDia('SEGUNDA');
    this.findMetasByDia('TERCA');
    this.findMetasByDia('QUARTA');
    this.findMetasByDia('QUINTA');
    this.findMetasByDia('SEXTA');
    this.findMetasByDia('SABADO');
    this.findMetasByDia('DOMINGO');
  }

  onCheckbox(item: Meta){
    console.log('item: ', item);
    this.salvar(item);
  }

  salvar(item: Meta) {
    item.finalizada = !item.finalizada;
    console.log('SALVANDO: ', item);
    this.service.inserirOuEditar(item)
      .subscribe(
        (response: ResponseApi) => {
         console.log('Cadastro realizado com sucesso!');
        }, erro => {
          console.log('Erro ao realizar cadastro!');
          console.log('erro: ', erro);
        }
      );
  }

  findMetasByDia(dia: string) {
    console.log('buscando metas por dia: ', dia);
    console.log('usuario: ', this.shared.user);
    this.service.findMetasByDia(dia).subscribe(
      (response: ResponseApi) => {
        if (dia === 'SEGUNDA'){
          this.listaSegunda = response.data;
        }else if(dia === 'TERCA'){
          this.listaTerca = response.data;
        }else if(dia === 'QUARTA'){
          this.listaQuarta = response.data;
        }else if(dia === 'QUINTA'){
          this.listaQuinta = response.data;
        }else if(dia === 'SEXTA'){
          this.listaSexta = response.data;
        }else if(dia === 'SABADO'){
          this.listaSabado = response.data;
        }else if(dia === 'DOMINGO'){
          this.listaDomingo = response.data;
        }
      }, erro => {
        console.log('Erro no FindAll...' + erro);
      }
    );
  }

}
