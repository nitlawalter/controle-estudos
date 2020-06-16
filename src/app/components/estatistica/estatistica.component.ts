import { Estatistica } from 'src/app/model/estatistica.model';
import { ResponseApi } from './../../model/response-api';
import { AssuntoService } from './../../services/assunto.service';
import { DisciplinaService } from './../../services/disciplina.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Disciplina } from 'src/app/model/disciplina.model';
import { EstatisticaService } from 'src/app/services/estatistica.service';

@Component({
  selector: 'app-estatistica',
  templateUrl: './estatistica.component.html',
  styleUrls: ['./estatistica.component.css']
})
export class EstatisticaComponent implements OnInit {

  formulario: FormGroup;
  estatistica: Estatistica;
  msgCadastro: string;
  alert: string;
  disciplinas = [];
  assuntos = [];
  disciplinaSelecionada: Disciplina;
  classStyle = {width: ''};
  classClass = 'progress-bar progress-bar-green';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: EstatisticaService,
    private serviceDisciplina: DisciplinaService,
    private serviceAssunto: AssuntoService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      id: [null],
      disciplina: [null, [Validators.required]],
      assunto: [null, [Validators.required]],
      acertos: [null, [Validators.required]],
      erros: [null, [Validators.required]],
      total: [null, [Validators.required]],
      percentual: [null, [Validators.required]]
    });

    let id: number = this.route.snapshot.params['id'];
    this.findById(id);
    this.findAllDisciplinas();

  }

  findById(id: number){
    this.service.findById(id).subscribe(
      (responseApi: ResponseApi) => {
        this.estatistica = responseApi.data;
        this.formulario.get('id').setValue(this.estatistica.id);
        this.formulario.get('acertos').setValue(this.estatistica.acertos);
        this.formulario.get('erros').setValue(this.estatistica.erros);
        this.formulario.get('total').setValue(this.estatistica.total);
        this.formulario.get('percentual').setValue(this.estatistica.percentual);
        this.formulario.get('assunto').setValue(this.estatistica.assunto);
        this.disciplinaSelecionada = this.estatistica.assunto.disciplina;
        this.findAssuntosByDisciplina();
      }, erro => {
       console.log('erro: ', erro);
      }
    );
  }

  salvar() {
    this.estatistica = new Estatistica(null, null, null, null, null, null);
    this.estatistica.id = this.formulario.get('id').value;
    this.estatistica.acertos = this.formulario.get('acertos').value;
    this.estatistica.erros = this.formulario.get('erros').value;
    this.estatistica.total = this.formulario.get('total').value;
    this.estatistica.percentual = this.formulario.get('percentual').value;
    this.estatistica.assunto = this.formulario.get('assunto').value;

    this.service.inserirOuEditar(this.estatistica)
      .subscribe(
        (response: ResponseApi) => {
         this.showMessage('Cadastro realizado com sucesso!', 'success');
        }, erro => {
          this.showMessage('Erro ao realizar cadastro!', 'danger');
          console.log('erro: ', erro);
        }
      );

  }

  voltarParaLista() {
    this.router.navigate(['/estatistica-list']);
  }

  private showMessage(msg: string, alert: string){
    this.msgCadastro = msg;
    this.alert = alert;
  }

  findAllDisciplinas() {
    this.serviceDisciplina.findAll().subscribe((response: ResponseApi) => {
      this.disciplinas = response.data;
      console.log(this.disciplinas);
    }, erro => {
      console.log('Erro no FindAll...' + erro);
    });
  }

  findAssuntosByDisciplina() {
    if(!this.disciplinaSelecionada){
      this.disciplinaSelecionada = this.formulario.get('disciplina').value;
    }
    this.serviceAssunto.findAssuntosByDisciplina(this.disciplinaSelecionada.id).subscribe(
      (response: ResponseApi) => {
        this.assuntos = response.data;
        console.log(this.assuntos);
      }, erro => {
        console.log('Erro no FindAll...' + erro);
      }
    );
  }

  compararSelect(obj1, obj2){
    return obj1 && obj2 ? (obj1.id === obj2.id) : obj1 === obj2;
  }

  calcularTotal() {
    let acertos: number = 0;
    let erros: number = 0;
    let total: number = 0;
    let percentual: number = 0;

    acertos = this.formulario.get('acertos')?.value;
    erros = this.formulario.get('erros')?.value;

    if (acertos == null){
      acertos = 0;
      this.formulario.get('acertos').setValue(0);
    }
    if (erros == null){
      erros = 0;
      this.formulario.get('erros').setValue(0);
    }

    if (acertos >= 0 && erros >= 0){
      total = acertos + erros;
      percentual = Math.round((acertos / total) * 100);
      this.formulario.get('total').setValue(total);
      this.formulario.get('percentual').setValue(percentual + '%');
      this.classStyle.width = percentual + '%';

      console.log('percentual: ', percentual);
      if (percentual >= 80) {
        this.classClass = 'progress-bar progress-bar-green';
      } else {
        this.classClass = 'progress-bar progress-bar-red';
      }

    }

  }

}
