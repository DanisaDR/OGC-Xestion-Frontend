import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SweetAlertService } from 'src/app/services/sweetalert.service';

@Injectable()
export class GlobalHttpInterceptor implements HttpInterceptor {

  errors: string[] = [];

  constructor(private alertSrv: SweetAlertService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {

        if(error.status === 0) {
          this.errors.push('Posible Erró de conectividade ou algo inesperado. Avise o/a ADMIN.')
          this.alertSrv.errorsSwal(this.errors);
        }

        return throwError(error);
      })
    );
  }
}
