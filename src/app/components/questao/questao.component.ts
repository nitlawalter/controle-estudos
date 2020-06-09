import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-questao',
  templateUrl: './questao.component.html',
  styleUrls: ['./questao.component.css']
})
export class QuestaoComponent implements OnInit {

  formulario: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      questao: [null, [Validators.required, Validators.minLength(3)]],
      comentario: [null, [Validators.required, Validators.minLength(3)]],
      resumo: [null, [Validators.required, Validators.minLength(3)]]
    });
  }

  salvar() {
    console.log(this.formulario);
  }

}
