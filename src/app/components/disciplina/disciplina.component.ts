import { Disciplina } from 'src/app/model/disciplina.model';
import { ResponseApi } from './../../model/response-api';
import { DisciplinaService } from './../../services/disciplina.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-disciplina',
  templateUrl: './disciplina.component.html',
  styleUrls: ['./disciplina.component.css']
})
export class DisciplinaComponent implements OnInit {

  formulario: FormGroup;
  disciplina: Disciplina;
  msgCadastro: string;
  alert: string;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: DisciplinaService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(3)]]
    });

    let id: number = this.route.snapshot.params['id'];

    this.findById(id);
  }

  findById(id: number){
    this.service.findById(id).subscribe( (responseApi: ResponseApi) => {
      this.disciplina = responseApi.data;
      this.formulario.get('id').setValue(this.disciplina.id);
      this.formulario.get('nome').setValue(this.disciplina.nome);
    }, erro => {
      console.log('erro: ', erro);
    });
  }

  salvar() {
    this.disciplina = new Disciplina(null, '');
    this.disciplina.id = this.formulario.get('id').value;
    this.disciplina.nome = this.formulario.get('nome').value;

    this.service.inserirOuEditar(this.disciplina)
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
    this.router.navigate(['/disciplina-list']);
  }

  private showMessage(msg: string, alert: string){
    this.msgCadastro = msg;
    this.alert = alert;
    /*setTimeout(() => {
      this.msgCadastro = undefined;
    }, 3000);*/
  }

}
