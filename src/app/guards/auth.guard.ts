import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../services/login.service';
import { ConstantsService } from '../services/constants.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService,
              private router: Router,
              private constantsService: ConstantsService) {

  }

  canActivate(next: ActivatedRouteSnapshot, status: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.loginService.isAuthenticated()) {
      if (this.isTokenExpired()) {
        this.loginService.logout();
        this.router.navigate([this.constantsService.loginUrl]);
        return false;
      }

      return true;
    }

    this.router.navigate([this.constantsService.loginUrl]);
    return false;
  }

  isTokenExpired(): boolean {
    const token = this.loginService.token;
    const payload = this.loginService.getDataToken(token);
    const now = new Date().getTime() / 1000;

    if (payload.exp < now) {
      return true;
    }

    return false;
  }

}

