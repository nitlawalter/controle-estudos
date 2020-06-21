import { Component } from '@angular/core';
import { SharedService } from './services/shared.service';
import { UsuarioService } from './services/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  showTemplate: boolean = false;
  public shared: SharedService;

  constructor(private userService: UsuarioService){
    this.shared = SharedService.getInstance();
  }

  ngOnInit(){
    this.shared.showTemplate.subscribe(
      (show: boolean) => this.showTemplate = show
    );
  }

  showContentWrapper(){
    return {
      'content-wrapper': this.shared.isLoggedIn()
    }
  }

}
