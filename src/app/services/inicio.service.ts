import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ConstantsService } from './constants.service';
import { LoginService } from './login.service';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class InicioService {

  params = new HttpParams();

  login: Login;

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json;charset=utf-8'
  });

  constructor(
    private http: HttpClient,
    private constSrv: ConstantsService,
    private loginSrv: LoginService
  ) { }

  getInicio() {
    return this.http.get(
      this.constSrv.inicio,
      { headers: this.httpHeaders }
    );
  }
}
