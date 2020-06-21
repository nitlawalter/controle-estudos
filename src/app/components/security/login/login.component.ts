import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { CurrentUser } from 'src/app/model/currentUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;
  user = new Usuario(null, null, null, null);
  shared: SharedService;
  message: string;

  constructor(
    private fb: FormBuilder,
    private userService: UsuarioService,
    private router: Router) {
    this.shared = SharedService.getInstance();
}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      email: [null, [Validators.required]],
      senha: [null, [Validators.required]]
    });
  }

  login(){
    this.message = '';
    this.user.email = this.formulario.get('email').value;
    this.user.senha = this.formulario.get('senha').value;
    console.log(this.user);
    this.userService.login(this.user).subscribe((userAuthentication: CurrentUser) => {
        console.log(userAuthentication);
        this.shared.token = userAuthentication.token;
        this.shared.user = userAuthentication.usuario;
        this.shared.user.perfil = this.shared.user.perfil.substring(5);
        this.shared.showTemplate.emit(true);
        this.router.navigate(['/']);
    } , err => {
      this.shared.token = null;
      this.shared.user = null;
      this.shared.showTemplate.emit(false);
      this.message = 'Erro ';
    });
  }

  cancelLogin(){
    this.message = '';
    this.user = new Usuario(null, null, null, null);
    window.location.href = '/login';
    window.location.reload();
  }

  getFormGroupClass(isInvalid: boolean, isDirty: boolean): {} {
    return {
      'form-group': true,
      'has-error' : isInvalid  && isDirty,
      'has-success' : !isInvalid  && isDirty
    };
  }

}
