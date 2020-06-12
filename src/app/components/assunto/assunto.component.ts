import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-assunto',
  templateUrl: './assunto.component.html',
  styleUrls: ['./assunto.component.css']
})
export class AssuntoComponent implements OnInit {

  formulario: FormGroup;

  disciplinas: any[];


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nome: [null, [Validators.required, Validators.minLength(3)]],
      disciplina: [null]
    });
    this.disciplinas = this.getDisciplinas();
  }

  salvar() {
    console.log(this.formulario);
  }

  setarDisciplina(){
    const disciplina = {id: 3, nome: 'penal'};
    this.formulario.get('disciplina').setValue(disciplina);
  }

  getDisciplinas() {
    return [
      {id: 1, nome: 'portugues'},
      {id: 2, nome: 'rlm'},
      {id: 3, nome: 'penal'}
    ];
  }

  compararSelect(obj1, obj2){
    return obj1 && obj2 ? (obj1.id === obj2.id) : obj1 === obj2;
  }


}
