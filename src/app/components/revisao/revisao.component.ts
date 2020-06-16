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
  selector: 'app-revisao',
  templateUrl: './revisao.component.html',
  styleUrls: ['./revisao.component.css']
})
export class RevisaoComponent implements OnInit {

  formulario: FormGroup;
  questao: Questao;
  msgCadastro: string;
  alert: string;
  disciplinas = [];
  assuntos = [];
  topicos = [];
  questoes = [];
  totalResgistros: number;
  disciplinaSelecionada: Disciplina;
  assuntoSelecionado: Assunto;
  resposta: string = null;
  acertou: boolean = false;

  mapQuestoes = new Map<number, Questao>();
  numQuestaoAtual: number = 1;

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
      comentario: [null, [Validators.required, Validators.maxLength(1000)]],
      resumo: [null, [Validators.required, Validators.maxLength(1000)]],
      gabarito: [null, [Validators.required]],
      disciplina: [null, [Validators.required]],
      assunto: [null, [Validators.required]],
      topico: [null, [Validators.required]],
      resposta: [null]

    });

    let id: number = this.route.snapshot.params['id'];
    this.findByTopicoAssuntoId(id);

  }

  findByTopicoAssuntoId(id: number){
    this.service.findByTopicoAssuntoId(id).subscribe(
      (responseApi: ResponseApi) => {
        this.questoes = responseApi.data;
        this.totalResgistros = this.questoes?.length;

        let i: number = 1;
        this.questoes.forEach(element => {
          this.questao = element;
          this.mapQuestoes.set(i, element);
          i = i + 1;
        });

        this.questao = this.mapQuestoes.get(1);
        console.log('Questao: ', this.questao);
        console.log('MapQuestoes: ', this.mapQuestoes);
        this.preencherFormulario(this.questao);
      }, erro => {
       console.log('erro: ', erro);
      }
    );
  }

  preencherFormulario(questao: Questao) {
    this.formulario.get('id').setValue(questao.id);
    this.formulario.get('questao').setValue(questao.questao);
    this.formulario.get('comentario').setValue(questao.comentario);
    this.formulario.get('resumo').setValue(questao.resumo);
    this.formulario.get('gabarito').setValue(questao.gabarito);
    this.formulario.get('topico').setValue(questao.topico.nome);
    this.formulario.get('disciplina').setValue(questao.topico.assunto.disciplina.nome);
    this.formulario.get('assunto').setValue(questao.topico.assunto.nome);
    this.formulario.get('revisao')?.setValue(questao.revisao);

    this.disciplinaSelecionada = questao.topico.assunto.disciplina;
    this.assuntoSelecionado = questao.topico.assunto;
  }

  proximo() {
    this.acertou = null;
    this.resposta = null;
    if (this.numQuestaoAtual < this.totalResgistros){
      this.numQuestaoAtual += 1;
      this.questao = this.mapQuestoes.get(this.numQuestaoAtual);
      this.preencherFormulario(this.mapQuestoes.get(this.numQuestaoAtual));
    }
  }

  anterior() {
    this.acertou = null;
    this.resposta = null;
    if (this.numQuestaoAtual > 1) {
      this.numQuestaoAtual -= 1;
      this.questao = this.mapQuestoes.get(this.numQuestaoAtual);
      this.preencherFormulario(this.mapQuestoes.get(this.numQuestaoAtual));
    }
  }

  primeiro() {
    this.acertou = null;
    this.resposta = null;
    this.numQuestaoAtual = 1;
    this.questao = this.mapQuestoes.get(this.numQuestaoAtual);
    this.preencherFormulario(this.mapQuestoes.get(this.numQuestaoAtual));
  }

  ultimo() {
    this.acertou = null;
    this.resposta = null;
    this.numQuestaoAtual = this.totalResgistros;
    this.questao = this.mapQuestoes.get(this.numQuestaoAtual);
    this.preencherFormulario(this.mapQuestoes.get(this.numQuestaoAtual));
  }

  voltarParaLista() {
    this.router.navigate(['/revisao-assunto/:id']);
  }

  responder() {
    console.log('Resposta: ', this.resposta);
    this.resposta = this.formulario.get('resposta').value;
    console.log('Resposta: ', this.resposta);
    console.log('acertou inicial: ', this.acertou);

    if (this.resposta === this.questao.gabarito){
      this.acertou = true;
      console.log('acertou: ', this.acertou);
    }else {
      this.acertou = false;
      console.log('errou: ', this.acertou);
    }
  }

  private showMessage(msg: string, alert: string){
    this.msgCadastro = msg;
    this.alert = alert;
  }

}
