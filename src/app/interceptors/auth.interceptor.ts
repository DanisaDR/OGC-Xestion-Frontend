import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { ConstantsService } from '../services/constants.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SweetAlertService } from '../services/sweetalert.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService,
              private router: Router,
              private constantsService: ConstantsService,
              private sweetAlertService: SweetAlertService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(e => {
        if (e.status === 401) {
          if (this.loginService.isAuthenticated()) {
            this.loginService.logout();
          }

          this.router.navigate([this.constantsService.loginUrl]);
        }

        if (e.status === 403) {
            this.sweetAlertService.errorsSwal(e.errors);
            this.router.navigate([this.constantsService.loginUrl]);
        }

        return throwError(e);
      })
    );
  }

}
