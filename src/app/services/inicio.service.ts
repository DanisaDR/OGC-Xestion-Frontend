import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {LoginService} from './login.service';
import {Login} from '../models/login';
import {ConstantsService} from './constants.service';

@Injectable({
  providedIn: 'root',
})
export class InicioService {
  params = new HttpParams();

  login: Login;

  headers = new HttpHeaders();

  constructor(
    private constSrv: ConstantsService,
    private loginSrv: LoginService,
    private httpClient: HttpClient,
  ) {
    this.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    this.headers.set('Access-Control-Allow-Methods', 'GET');
    this.headers.set('Access-Control-Allow-Origin', '*');
  }

  getInicio() {
    return this.httpClient.get(this.constSrv.inicio, {
      headers: this.headers,
    });
  }

  getRRSSRedeoza() {
    return this.httpClient.get(this.constSrv.blogueRRSS, {
      headers: this.headers,
    });
  }
}
