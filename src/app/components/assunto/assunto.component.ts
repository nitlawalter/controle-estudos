import { Assunto } from 'src/app/model/assunto.model';
import { ResponseApi } from './../../model/response-api';
import { AssuntoService } from './../../services/assunto.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DisciplinaService } from 'src/app/services/disciplina.service';


@Component({
  selector: 'app-assunto',
  templateUrl: './assunto.component.html',
  styleUrls: ['./assunto.component.css']
})
export class AssuntoComponent implements OnInit {

  formulario: FormGroup;
  assunto: Assunto;
  msgCadastro: string;
  alert: string;
  disciplinas = [];


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: AssuntoService,
    private serviceDisciplina: DisciplinaService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(3)]],
      disciplina: [null, [Validators.required]]
    });

    let id: number = this.route.snapshot.params['id'];
    this.findById(id);

    //this.getDisciplinas();
    this.findAllDisciplinas();
  }

  findById(id: number){
    this.service.findById(id).subscribe( (responseApi: ResponseApi) => {
      this.assunto = responseApi.data;
      console.log('Assunto encontrado: ', this.assunto);
      this.formulario.get('id').setValue(this.assunto.id);
      this.formulario.get('nome').setValue(this.assunto.nome);
      this.formulario.get('disciplina').setValue(this.assunto.disciplina)
    }, erro => {
      console.log('erro: ', erro);
    });
  }

  salvar() {
    this.assunto = new Assunto(null, '', null);
    this.assunto.id = this.formulario.get('id').value;
    this.assunto.nome = this.formulario.get('nome').value;
    this.assunto.disciplina = this.formulario.get('disciplina').value;

    console.log('SALVANDO: ', this.assunto);

    this.service.inserirOuEditar(this.assunto)
      .subscribe(
        (response: ResponseApi) => {
         this.showMessage('Cadastro realizado com sucesso!', 'success');
         this.formulario.reset();
        }, erro => {
          this.showMessage('Erro ao realizar cadastro!', 'danger');
          console.log('erro: ', erro);
        }
      );

  }

  voltarParaLista() {
    this.router.navigate(['/assunto-list']);
  }

  private showMessage(msg: string, alert: string){
    this.msgCadastro = msg;
    this.alert = alert;
    /*setTimeout(() => {
      this.msgCadastro = undefined;
    }, 3000);*/
  }

  getDisciplinas() {
    return [
      {id: 1, nome: 'portugues'},
      {id: 2, nome: 'rlm'},
      {id: 3, nome: 'penal'}
    ];
  }

  findAllDisciplinas() {
    console.log('BUSCANDO DISCIPLINAS PARA COMBO');
    this.serviceDisciplina.findAll().subscribe((response: ResponseApi) => {
      this.disciplinas = response.data;
      console.log(this.disciplinas);
    }, erro => {
      console.log('Erro no FindAll...' + erro);
    });
  }

  compararSelect(obj1, obj2){
    return obj1 && obj2 ? (obj1.id === obj2.id) : obj1 === obj2;
  }


}
