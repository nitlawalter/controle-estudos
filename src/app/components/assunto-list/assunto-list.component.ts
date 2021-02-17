import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AssuntoService } from 'src/app/services/assunto.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ResponseApi } from './../../model/response-api';
import { Disciplina } from 'src/app/model/disciplina.model';
import { DisciplinaService } from 'src/app/services/disciplina.service';

@Component({
  selector: 'app-assunto-list',
  templateUrl: './assunto-list.component.html',
  styleUrls: ['./assunto-list.component.css']
})
export class AssuntoListComponent implements OnInit {

  formulario: FormGroup;
  lista = [];
  modalRef: BsModalRef;
  idDelete: number;
  nomeDelete: string;
  msgExclusao: string;
  alert: string;
  totalResgistros: number;
  disciplinaSelecionada: Disciplina;
  disciplinas = [];


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: AssuntoService,
    private serviceDisciplina: DisciplinaService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    //this.findAll();
    this.formulario = this.fb.group({
      disciplina: [null, [Validators.required]]
    });
    
    this.findAllDisciplinas();
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
    this.router.navigate(['/assunto', id]);
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
    this.router.navigate(['/assunto']);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  private showMessage(msg: string, alert: string){
    this.msgExclusao = msg;
    this.alert = alert;
  }

  findAllDisciplinas() {
    this.serviceDisciplina.findAll().subscribe(
      (response: ResponseApi) => {
        this.disciplinas = response.data;
        console.log(this.disciplinas);
      }, erro => {
        console.log('Erro no FindAll...' + erro);
      }
    );
  }

  findAssuntosByDisciplina() {
    console.log('buscando assuntos por disciplina: ', this.formulario.get('disciplina').value);
    console.log('disciplina selecionada: ', this.disciplinaSelecionada);

    this.disciplinaSelecionada = this.formulario.get('disciplina').value;
    console.log('selecionou: ', this.disciplinaSelecionada);

    this.service.findAssuntosByDisciplina(this.disciplinaSelecionada.id).subscribe(
      (response: ResponseApi) => {
        this.lista = response.data;
        this.totalResgistros = this.lista?.length;
      }, erro => {
        console.log('Erro no FindAll...' + erro);
      }
    );
  }

  pesquisar() {
    this.disciplinaSelecionada = this.formulario.get('disciplina').value;
    this.lista = null;
    console.log('disciplina selecionada: ', this.disciplinaSelecionada);

    if (this.disciplinaSelecionada != null){
      this.pesquisarPorDisciplina(this.disciplinaSelecionada.id);
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
  }

  compararSelect(obj1, obj2){
    return obj1 && obj2 ? (obj1.id === obj2.id) : obj1 === obj2;
  }

}
