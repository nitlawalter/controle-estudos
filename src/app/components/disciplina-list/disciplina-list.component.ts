import { ResponseApi } from './../../model/response-api';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DisciplinaService } from 'src/app/services/disciplina.service';

@Component({
  selector: 'app-disciplina-list',
  templateUrl: './disciplina-list.component.html',
  styleUrls: ['./disciplina-list.component.css']
})
export class DisciplinaListComponent implements OnInit {

  formulario: FormGroup;

  lista = [];

  constructor(private router: Router, private service: DisciplinaService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe((response:ResponseApi) => {
      this.lista = response.data;
      console.log(this.lista);
    }, erro => {
      console.log('Erro no FindAll...');
    });
  }

  editar(id: number) {
    this.router.navigate(['/disciplina', id]);
  }

  deletar(id: number) {

  }

  novo() {
    this.router.navigate(['/disciplina']);
  }

}
