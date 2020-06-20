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
  idDisciplina: number;
  mostrarAlertErrada: boolean = false;
  mostrarAlertCorreta: boolean = false;
  habilitarBtnResponder: boolean = false;
  classStyle = {width: ''};
  classClass = 'progress-bar progress-bar-green';
  acertos: number = 0;
  erros: number = 0;
  total: number = 0;
  percentual: string = null;

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
      resposta: [null],
      acertos: [null],
      erros: [null],
      total: [null],
      percentual: [null]

    });

    let id:number = this.route.snapshot.params['id'];
    this.findByTopicoAssuntoId(id);

  }

  findByTopicoAssuntoId(id: number){
    this.service.findByTopicoAssuntoId(id).subscribe(
      (responseApi: ResponseApi) => {
        this.questoes = responseApi.data;
        this.totalResgistros = this.questoes?.length;
        console.log('registros ', this.totalResgistros);
        
        if (this.totalResgistros > 0){
          let i: number = 1;
          this.questoes.forEach(element => {
            this.questao = element;
            this.mapQuestoes.set(i, element);
            i = i + 1;
          });

          this.questao = this.mapQuestoes.get(1);
          this.idDisciplina = this.questao.topico.assunto.disciplina.id;
          this.preencherFormulario(this.questao);
        } else {
          this.pesquisarAssuntoPorId(id);            
        }      

      }, erro => {
       console.log('erro: ', erro);
      }
    );
  }

  pesquisarAssuntoPorId(id: number){
    this.serviceAssunto.findById(id).subscribe( (responseApi: ResponseApi) => {
      this.assuntoSelecionado = responseApi.data;
      this.formulario.get('assunto').setValue(this.assuntoSelecionado.nome);
      this.disciplinaSelecionada = this.assuntoSelecionado.disciplina;
      this.idDisciplina = this.assuntoSelecionado.disciplina.id;
    }, erro => {
      console.log('erro: ', erro);
    });
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
    this.formulario.get('resposta')?.setValue(null);
    this.mostrarAlertCorreta = false;
    this.mostrarAlertErrada = false;
    if (this.numQuestaoAtual < this.totalResgistros){
      this.numQuestaoAtual += 1;
      this.questao = this.mapQuestoes.get(this.numQuestaoAtual);
      this.preencherFormulario(this.mapQuestoes.get(this.numQuestaoAtual));
    }
  }

  anterior() {
    this.acertou = null;
    this.formulario.get('resposta')?.setValue(null);
    this.mostrarAlertCorreta = false;
    this.mostrarAlertErrada = false;
    if (this.numQuestaoAtual > 1) {
      this.numQuestaoAtual -= 1;
      this.questao = this.mapQuestoes.get(this.numQuestaoAtual);
      this.preencherFormulario(this.mapQuestoes.get(this.numQuestaoAtual));
    }
  }

  primeiro() {
    this.acertou = null;
    this.formulario.get('resposta')?.setValue(null);
    this.mostrarAlertCorreta = false;
    this.mostrarAlertErrada = false;
    this.numQuestaoAtual = 1;
    this.questao = this.mapQuestoes.get(this.numQuestaoAtual);
    this.preencherFormulario(this.mapQuestoes.get(this.numQuestaoAtual));
  }

  ultimo() {
    this.acertou = null;
    this.formulario.get('resposta')?.setValue(null);
    this.mostrarAlertCorreta = false;
    this.mostrarAlertErrada = false;
    this.numQuestaoAtual = this.totalResgistros;
    this.questao = this.mapQuestoes.get(this.numQuestaoAtual);
    this.preencherFormulario(this.mapQuestoes.get(this.numQuestaoAtual));
  }

  voltarParaLista() {
    this.router.navigate(['/revisao-assunto', this.idDisciplina]);
  }

  responder() {
    this.resposta = this.formulario.get('resposta').value;
    console.log(this.resposta);

    if (this.resposta != null){
      if (this.resposta === this.questao.gabarito){
        this.acertou = true;
        this.mostrarAlertCorreta = true;
        this.mostrarAlertErrada = false;
        this.calcularTotal(this.acertou);
      }else {
        this.acertou = false;
        this.mostrarAlertCorreta = false;
        this.mostrarAlertErrada = true;
        this.calcularTotal(this.acertou);
      }
    }

  }

  private showMessage(msg: string, alert: string){
    this.msgCadastro = msg;
    this.alert = alert;
  }

  calcularTotal(flag: boolean) {

    if(flag){
      this.acertos += 1;
    } else {
      this.erros += 1;
    }

    let acertos: number = 0;
    let erros: number = 0;
    let total: number = 0;
    let percentual: number = 0;

    acertos = this.acertos;
    this.formulario.get('acertos').setValue(0);
    erros = this.erros;
    this.formulario.get('erros').setValue(0);

    if (acertos >= 0 && erros >= 0){
      total = acertos + erros;

      percentual = Math.round((acertos / total) * 100);
      this.total = total;
      this.percentual = percentual + '%';
      this.formulario.get('percentual').setValue(percentual + '%');
      this.classStyle.width = percentual + '%';
      console.log('percentual: ', percentual);

      if (percentual >= 80) {
        console.log('verde ', percentual);
        this.classClass = 'progress-bar progress-bar-green';
      } else {
        console.log('vermelho ', percentual);
        this.classClass = 'progress-bar progress-bar-red';
      }

    }
  }

}
