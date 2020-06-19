import { Meta } from 'src/app/model/meta.model';
import { ResponseApi } from './../../model/response-api';
import { MetaService } from './../../services/meta.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-meta',
  templateUrl: './meta.component.html',
  styleUrls: ['./meta.component.css']
})
export class MetaComponent implements OnInit {

  listaDias = ['SEGUNDA', 'TERCA', 'QUARTA', 'QUINTA', 'SEXTA', 'SABADO', 'DOMINGO'];
  listaEstudo = ['Questões', 'Lei seca', 'Resumo', 'Simulado', 'Redação'];
  formulario: FormGroup;
  meta: Meta;
  msgCadastro: string;
  alert: string;
  

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: MetaService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(3)]],
      dia: [null, [Validators.required]],
      estudo: [null, [Validators.required]]
    });

    let id: number = this.route.snapshot.params['id'];
    this.findById(id);
  }

  findById(id: number){
    this.service.findById(id).subscribe( (responseApi: ResponseApi) => {
      this.meta = responseApi.data;
      console.log('meta encontrado: ', this.meta);
      this.formulario.get('id').setValue(this.meta.id);
      this.formulario.get('nome').setValue(this.meta.nome);
      this.formulario.get('dia').setValue(this.meta.dia);
      this.formulario.get('estudo').setValue(this.meta.estudo)
    }, erro => {
      console.log('erro: ', erro);
    });
  }

  salvar() {
    this.meta = new Meta(null, null, null, false, null);
    this.meta.id = this.formulario.get('id').value;
    this.meta.nome = this.formulario.get('nome').value;
    this.meta.dia = this.formulario.get('dia').value;
    this.meta.estudo = this.formulario.get('estudo').value;

    console.log('SALVANDO: ', this.meta);

    this.service.inserirOuEditar(this.meta)
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
    this.router.navigate(['/meta-list']);
  }

  private showMessage(msg: string, alert: string){
    this.msgCadastro = msg;
    this.alert = alert;
    /*setTimeout(() => {
      this.msgCadastro = undefined;
    }, 3000);*/
  }

  compararSelect(obj1, obj2){
    return obj1 && obj2 ? (obj1.id === obj2.id) : obj1 === obj2;
  }



}
