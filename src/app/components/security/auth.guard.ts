import { Injectable } from '@angular/core';
import { Route, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  public shared: SharedService;

  constructor(
    private userService: UsuarioService,
    private router: Router) {
      this.shared = SharedService.getInstance();
  }

  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | boolean {
    if(this.shared.isLoggedIn()){
        return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

}
