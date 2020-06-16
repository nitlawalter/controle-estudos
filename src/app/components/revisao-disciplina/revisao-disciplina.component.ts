import { ResponseApi } from './../../model/response-api';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DisciplinaService } from 'src/app/services/disciplina.service';


@Component({
  selector: 'app-revisao-disciplina',
  templateUrl: './revisao-disciplina.component.html',
  styleUrls: ['./revisao-disciplina.component.css']
})
export class RevisaoDisciplinaComponent implements OnInit {

  formulario: FormGroup;
  lista = [];
  idDelete: number;
  nomeDelete: string;
  msgExclusao: string;
  alert: string;
  totalResgistros: number;


  constructor(
    private router: Router,
    private service: DisciplinaService) { }

  ngOnInit(): void {
    this.findAll();
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
    this.router.navigate(['/revisao-assunto', id]);
  }

  novo() {
    this.router.navigate(['/revisao-assunto']);
  }


}
