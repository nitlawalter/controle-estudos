import { ResponseApi } from './../../model/response-api';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DisciplinaService } from 'src/app/services/disciplina.service';
import { AssuntoService } from 'src/app/services/assunto.service';


@Component({
  selector: 'app-revisao-assunto',
  templateUrl: './revisao-assunto.component.html',
  styleUrls: ['./revisao-assunto.component.css']
})
export class RevisaoAssuntoComponent implements OnInit {

  formulario: FormGroup;
  lista = [];
  idDelete: number;
  nomeDelete: string;
  msgExclusao: string;
  alert: string;
  totalResgistros: number;
  nomeDisciplina: string;


  constructor(
    private router: Router,
    private disciplinaService: DisciplinaService,
    private service: AssuntoService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id: number = this.route.snapshot.params['id'];
    this.findAssuntosByDisciplina(id);
  }

  findAssuntosByDisciplina(id: number) {
    this.service.findAssuntosByDisciplina(id).subscribe((response: ResponseApi) => {
      this.lista = response.data;
      this.totalResgistros = this.lista?.length;
      this.nomeDisciplina =  this.lista[0].disciplina.nome;
    }, erro => {
      console.log('Erro no FindAll...' + erro);
    });


  }

  editar(id: number) {
    this.router.navigate(['/revisao', id]);
  }

  voltarParaLista() {
    this.router.navigate(['/revisao-disciplina']);
  }


}
