import {
  HttpInterceptor,
  HttpHandler,
  HttpEvent,
  HttpRequest,
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginService} from '../services/login.service';
import {Injectable} from '@angular/core';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public loginSrv: LoginService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const token = this.loginSrv.token;

    if (token != null) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token),
      });

      return next.handle(authReq);
    }

    return next.handle(req);
  }
}
