import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { TopicoService } from 'src/app/services/topico.service';
import { QuestaoService } from 'src/app/services/questao.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ResponseApi } from './../../model/response-api';
import { DisciplinaService } from 'src/app/services/disciplina.service';
import { AssuntoService } from 'src/app/services/assunto.service';
import { Disciplina } from 'src/app/model/disciplina.model';
import { Assunto } from 'src/app/model/assunto.model';

@Component({
  selector: 'app-questao-list',
  templateUrl: './questao-list.component.html',
  styleUrls: ['./questao-list.component.css']
})
export class QuestaoListComponent implements OnInit {

  formulario: FormGroup;
  lista = [];
  modalRef: BsModalRef;
  idDelete: number;
  nomeDelete: string;
  msgExclusao: string;
  alert: string;
  totalResgistros: number;
  disciplinas = [];
  assuntos = [];
  disciplinaSelecionada: Disciplina;
  assuntoSelecionado: Assunto;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: QuestaoService,
    private topicoService: TopicoService,
    private serviceDisciplina: DisciplinaService,
    private serviceAssunto: AssuntoService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      disciplina: [null, [Validators.required]],
      assunto: [null]
    });
    this.findAllDisciplinas();
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
    this.assuntoSelecionado = null;
    this.formulario.get('assunto').setValue(null);
    console.log('assunto selecionado formulario: ', this.formulario.get('assunto').value);

    this.serviceAssunto.findAssuntosByDisciplina(this.disciplinaSelecionada.id).subscribe(
      (response: ResponseApi) => {
        this.assuntos = response.data;
        console.log(this.assuntos);
      }, erro => {
        console.log('Erro no FindAll...' + erro);
      }
    );
  }

  findAll() {
    this.service.findAll().subscribe(
      (response: ResponseApi) => {
        this.lista = response.data;
        this.totalResgistros = this.lista?.length;
      }, erro => {
        console.log('Erro no FindAll...' + erro);
      }
    );
  }

  editar(id: number) {
    this.router.navigate(['/questao', id]);
  }

  openModalDeletar(id: number, nome: string, template: TemplateRef<any>) {
    this.idDelete = id;
    this.nomeDelete = nome;
    this.modalRef = this.modalService.show(template);
  }

  deletar() {
    this.service.deletar(this.idDelete).subscribe(
      (responseApi: ResponseApi) => {
        this.showMessage('Cadastro excluído com sucesso!', 'success');
        this.findAll();
        this.modalRef.hide();
      }, erro => {
        console.log('erro: ', erro);
        this.showMessage('Erro ao excluir cadastro', 'danger');
      }
    );
  }

  novo() {
    this.router.navigate(['/questao']);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  private showMessage(msg: string, alert: string){
    this.msgExclusao = msg;
    this.alert = alert;
  }

  pesquisar() {
    this.disciplinaSelecionada = this.formulario.get('disciplina').value;
    this.assuntoSelecionado = this.formulario.get('assunto').value;
    this.lista = null;
    console.log('disciplina selecionada: ', this.disciplinaSelecionada);
    console.log('assunto selecionado: ', this.assuntoSelecionado);

    if (this.disciplinaSelecionada != null && this.assuntoSelecionado != null){
      this.pesquisarPorAssunto(this.assuntoSelecionado.id);
    } else if (this.disciplinaSelecionada != null){
      this.pesquisarPorDisciplina(this.disciplinaSelecionada.id);
    } else {
      console.log('não pesquisar nada');
    }
  }

  pesquisarPorAssunto(id: number){
    console.log('pesquisando por assunto');
    this.service.findByTopicoAssuntoId(id).subscribe(
      (response: ResponseApi) => {
        this.lista = response.data;
        this.totalResgistros = this.lista?.length;
      }, erro => {
        console.log('Erro no FindAll...' + erro);
      }
    );
  }

  pesquisarPorDisciplina(id: number){
    console.log('pesquisando por disciplina');
    this.service.findByTopicoAssuntoDisciplinaId(id).subscribe(
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
