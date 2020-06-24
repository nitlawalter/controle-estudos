import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ResponseApi } from './../../model/response-api';
import { MetaService } from 'src/app/services/meta.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-meta-list',
  templateUrl: './meta-list.component.html',
  styleUrls: ['./meta-list.component.css']
})
export class MetaListComponent implements OnInit {

  formulario: FormGroup;
  lista = [];
  modalRef: BsModalRef;
  idDelete: number;
  nomeDelete: string;
  msgExclusao: string;
  alert: string;
  totalResgistros: number;
  diaSelecionado: string;
  listaDias = ['SEGUNDA', 'TERCA', 'QUARTA', 'QUINTA', 'SEXTA', 'SABADO', 'DOMINGO'];
  listaEstudo = ['Questões', 'Lei seca', 'Resumo', 'Simulado', 'Redação'];

  shared: SharedService;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: MetaService,
    private modalService: BsModalService) {
      this.shared = SharedService.getInstance();
     }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      dia: [null, [Validators.required]]
    });

  }

  findAll() {
    this.service.findAll().subscribe((response: ResponseApi) => {
      this.lista = response.data;
      this.totalResgistros = this.lista?.length;
    }, erro => {
      console.log('Erro no FindAll...' + erro);
    });
  }

  editar(id: number) {
    this.router.navigate(['/meta', id]);
  }

  openModalDeletar(id: number, nome: string, template: TemplateRef<any>) {
    this.idDelete = id;
    this.nomeDelete = nome;
    this.modalRef = this.modalService.show(template);
  }

  deletar() {
    this.service.deletar(this.idDelete).subscribe( (responseApi: ResponseApi) => {
      this.showMessage('Cadastro excluído com sucesso!', 'success');
      this.findAll();
      this.modalRef.hide();
    }, erro => {
      console.log('erro: ', erro);
      this.showMessage('Erro ao excluir cadastro', 'danger');
    });
  }

  novo() {
    this.router.navigate(['/meta']);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  private showMessage(msg: string, alert: string){
    this.msgExclusao = msg;
    this.alert = alert;
  }

  getDias() {
  }

  findMetasByDia() {
    console.log('buscando metas por dia: ', this.formulario.get('dia').value);
    console.log('dia selecionada: ', this.diaSelecionado);

    this.diaSelecionado = this.formulario.get('dia').value;
    console.log('selecionou: ', this.diaSelecionado);

    this.service.findMetasByDiaAndUsuario(this.diaSelecionado, this.shared.user.id).subscribe(
      (response: ResponseApi) => {
        this.lista = response.data;
        this.totalResgistros = this.lista?.length;
      }, erro => {
        console.log('Erro no FindAll...' + erro);
      }
    );
  }

  /*pesquisar() {
    this.diaSelecionado = this.formulario.get('dia').value;
    this.lista = null;
    console.log('dia selecionada: ', this.diaSelecionado);

    if (this.diaSelecionado != null){
      this.pesquisarPorDisciplina(this.diaSelecionado.id);
    } else {
      console.log('não pesquisar nada');
    }
  }

  pesquisarPorDisciplina(id: number){
    console.log('pesquisando por disciplina');
    this.service.findAssuntosByDisciplina(id).subscribe(
      (response: ResponseApi) => {
        this.lista = response.data;
        this.totalResgistros = this.lista?.length;
      }, erro => {
        console.log('Erro no FindAll...' + erro);
      }
    );
  }*/

  compararSelect(obj1, obj2){
    return obj1 && obj2 ? (obj1.id === obj2.id) : obj1 === obj2;
  }


}
