import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { TopicoService } from 'src/app/services/topico.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ResponseApi } from './../../model/response-api';

@Component({
  selector: 'app-topico-list',
  templateUrl: './topico-list.component.html',
  styleUrls: ['./topico-list.component.css']
})
export class TopicoListComponent implements OnInit {

  formulario: FormGroup;
  lista = [];
  modalRef: BsModalRef;
  idDelete: number;
  nomeDelete: string;
  msgExclusao: string;
  alert: string;
  totalResgistros: number;

  constructor(
    private router: Router,
    private service: TopicoService,
    private modalService: BsModalService) { }

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
    this.router.navigate(['/topico', id]);
  }

  openModalDeletar(id: number, nome: string, template: TemplateRef<any>) {
    this.idDelete = id;
    this.nomeDelete = nome;
    this.modalRef = this.modalService.show(template);
  }

  deletar() {
    this.service.deletar(this.idDelete).subscribe( (responseApi: ResponseApi) => {
      this.showMessage('Cadastro excluído com sucesso!', 'success');
      this.findAll();     
      this.modalRef.hide();
    }, erro => {
      console.log('erro: ', erro);
      this.showMessage('Erro ao excluir cadastro', 'danger');
    });
  }

  novo() {
    this.router.navigate(['/topico']);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  private showMessage(msg: string, alert: string){
    this.msgExclusao = msg;
    this.alert = alert;   
  }

}
