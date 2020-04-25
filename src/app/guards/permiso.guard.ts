import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ConstantsService } from '../services/constants.service';
import { SweetAlertService } from '../services/sweetalert.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermisoGuard implements CanActivate {

  constructor(private loginService: LoginService,
              private constantsService: ConstantsService,
              private sweetAlert: SweetAlertService,
              private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, status: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (!this.loginService.isAuthenticated()) {
      this.router.navigate([this.constantsService.homeUrl]);
      return false;
    }

    const permisos = next.data.permisos as string[];

    if (this.loginService.hasPermission(permisos)) {
      return true;
    }

    this.sweetAlert.accessDeny(this.loginService.login.usuAlias);
    this.router.navigate([this.constantsService.loginUrl]);
    return false;
  }
}
