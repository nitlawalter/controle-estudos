import { Questao } from 'src/app/model/questao.model';
import { ResponseApi } from './../../model/response-api';
import { QuestaoService } from './../../services/questao.service';
import { AssuntoService } from './../../services/assunto.service';
import { TopicoService } from './../../services/topico.service';
import { DisciplinaService } from './../../services/disciplina.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Disciplina } from 'src/app/model/disciplina.model';
import { Assunto } from 'src/app/model/assunto.model';



@Component({
  selector: 'app-questao',
  templateUrl: './questao.component.html',
  styleUrls: ['./questao.component.css']
})
export class QuestaoComponent implements OnInit {

  formulario: FormGroup;
  questao: Questao;
  msgCadastro: string;
  alert: string;
  disciplinas = [];
  assuntos = [];
  topicos = [];
  disciplinaSelecionada: Disciplina;
  assuntoSelecionado: Assunto;
  contadorQuestao: number = 0;
  contadorQuestaoRestam: number = 500;
  contadorComentario: number = 0;
  contadorComentarioRestam: number = 1000;
  contadorResumo: number = 0;
  contadorResumoRestam: number = 1000;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: QuestaoService,
    private serviceTopico: TopicoService,
    private serviceDisciplina: DisciplinaService,
    private serviceAssunto: AssuntoService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      id: [null],
      questao: [null, [Validators.required, Validators.maxLength(500)]],
      comentario: [null, [Validators.maxLength(1000)]],
      resumo: [null, [Validators.maxLength(1000)]],
      gabarito: [null, [Validators.required]],
      disciplina: [null, [Validators.required]],
      assunto: [null, [Validators.required]],
      topico: [null, [Validators.required]],
      revisao: [null]

    });

    let id: number = this.route.snapshot.params['id'];
    this.findById(id);
    this.findAllDisciplinas();

  }

  findById(id: number){
    this.service.findById(id).subscribe(
      (responseApi: ResponseApi) => {
        this.questao = responseApi.data;
        this.formulario.get('id').setValue(this.questao.id);
        this.formulario.get('questao').setValue(this.questao.questao);
        this.formulario.get('comentario').setValue(this.questao.comentario);
        this.formulario.get('resumo').setValue(this.questao.resumo);
        this.formulario.get('gabarito').setValue(this.questao.gabarito);
        this.formulario.get('topico').setValue(this.questao.topico);
        this.formulario.get('disciplina').setValue(this.questao.topico.assunto.disciplina);
        this.formulario.get('assunto').setValue(this.questao.topico.assunto);
        this.formulario.get('revisao').setValue(this.questao.revisao);

        this.disciplinaSelecionada = this.questao.topico.assunto.disciplina;
        this.assuntoSelecionado = this.questao.topico.assunto;
        this.findAssuntosByDisciplina();
      }, erro => {
       console.log('erro: ', erro);
      }
    );
  }

  salvar() {
    this.questao = new Questao(null, '', null, null, null, null, false);
    this.questao.id = this.formulario.get('id').value;
    this.questao.questao = this.formulario.get('questao').value;
    this.questao.comentario = this.formulario.get('comentario').value;
    this.questao.resumo = this.formulario.get('resumo').value;
    this.questao.gabarito = this.formulario.get('gabarito').value;
    this.questao.topico = this.formulario.get('topico').value;
    this.questao.revisao = this.formulario.get('revisao').value;

    this.service.inserirOuEditar(this.questao)
      .subscribe(
        (response: ResponseApi) => {
         this.showMessage('Cadastro realizado com sucesso!', 'success');
         this.formulario.reset();
         this.topicos = null;
         this.assuntos = null;
        }, erro => {
          this.showMessage('Erro ao realizar cadastro!', 'danger');
          console.log('erro: ', erro);
        }
      );

  }

  voltarParaLista() {
    this.router.navigate(['/questao-list']);
  }

  private showMessage(msg: string, alert: string){
    this.msgCadastro = msg;
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

    this.serviceAssunto.findAssuntosByDisciplina(this.disciplinaSelecionada.id).subscribe(
      (response: ResponseApi) => {
        this.assuntos = response.data;
        console.log(this.assuntos);
      }, erro => {
        console.log('Erro no FindAll...' + erro);
      }
    );
  }

  findTopicosByAssunto() {
    this.assuntoSelecionado = this.formulario.get('assunto').value;
    console.log('Assunto selecionado:', this.assuntoSelecionado);

    this.serviceTopico.findTopicosByAssunto(this.assuntoSelecionado.id).subscribe(
      (response: ResponseApi) => {
        this.topicos = response.data;
        console.log(this.topicos);
      }, erro => {
        console.log('Erro no FindAll...' + erro);
      }
    );
  }

  compararSelect(obj1, obj2){
    return obj1 && obj2 ? (obj1.id === obj2.id) : obj1 === obj2;
  }

  contarCaracteresQuestao(){
    let campo: string = this.formulario.get('questao')?.value;
    if (campo?.length == 0 || campo?.length == undefined) {
      this.contadorQuestao = 1;
    }else {
      this.contadorQuestao = campo.length + 1;
    }
  }

  contarCaracteresComentario(){
    let campo: string = this.formulario.get('comentario')?.value;
    if (campo?.length == 0 || campo?.length == undefined) {
      this.contadorComentario = 1;
    }else {
      this.contadorComentario = campo.length + 1;
    }
  }

  contarCaracteresResumo(){
    let campo: string = this.formulario.get('resumo')?.value;
    if (campo?.length == 0 || campo?.length == undefined) {
      this.contadorResumo = 1;
    }else {
      this.contadorResumo = campo.length + 1;
    }
  }


}
