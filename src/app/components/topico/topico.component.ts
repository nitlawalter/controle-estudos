import { Topico } from 'src/app/model/topico.model';
import { ResponseApi } from './../../model/response-api';
import { AssuntoService } from './../../services/assunto.service';
import { TopicoService } from './../../services/topico.service';
import { DisciplinaService } from './../../services/disciplina.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Disciplina } from 'src/app/model/disciplina.model';


@Component({
  selector: 'app-topico',
  templateUrl: './topico.component.html',
  styleUrls: ['./topico.component.css']
})
export class TopicoComponent implements OnInit {

  formulario: FormGroup;
  topico: Topico;
  msgCadastro: string;
  alert: string;
  disciplinas = [];
  assuntos = [];
  disciplinaSelecionada: Disciplina;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: TopicoService,
    private serviceDisciplina: DisciplinaService,
    private serviceAssunto: AssuntoService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
      disciplina: [null, [Validators.required]],
      assunto: [null, [Validators.required]]
    });

    let id: number = this.route.snapshot.params['id'];
    this.findById(id);
    this.findAllDisciplinas();

  }

  findById(id: number){
    this.service.findById(id).subscribe(
      (responseApi: ResponseApi) => {
        this.topico = responseApi.data;
        this.formulario.get('id').setValue(this.topico.id);
        this.formulario.get('nome').setValue(this.topico.nome);
        this.formulario.get('disciplina').setValue(this.topico.assunto.disciplina);
        this.formulario.get('assunto').setValue(this.topico.assunto);
        this.disciplinaSelecionada = this.topico.assunto.disciplina;
        this.findAssuntosByDisciplina();
      }, erro => {
       console.log('erro: ', erro);
      }
    );
  }

  salvar() {
    this.topico = new Topico(null, '', null);
    this.topico.id = this.formulario.get('id').value;
    this.topico.nome = this.formulario.get('nome').value;
    this.topico.assunto = this.formulario.get('assunto').value;

    this.service.inserirOuEditar(this.topico)
      .subscribe(
        (response: ResponseApi) => {
         this.showMessage('Cadastro realizado com sucesso!', 'success');
         this.assuntos = null;
         this.formulario.reset();
        }, erro => {
          this.showMessage('Erro ao realizar cadastro!', 'danger');
          console.log('erro: ', erro);
        }
      );

  }

  voltarParaLista() {
    this.router.navigate(['/topico-list']);
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


}
