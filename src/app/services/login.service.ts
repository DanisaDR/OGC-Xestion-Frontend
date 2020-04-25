import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Login } from '../models/login';
import { ConstantsService } from './constants.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // tslint:disable-next-line: variable-name
  private _login: Login;

  // tslint:disable-next-line: variable-name
  private _token: string;

  httpHeaders: HttpHeaders | { [header: string]: string | string[]; };

  constructor(private http: HttpClient,
              private constSrv: ConstantsService) {

  }

  get login(): Login {
    if (this._login != null) {
      return this._login;
    } else if (this._login == null && localStorage.getItem(this.constSrv.loginVariable) != null) {
      this._login = JSON.parse(localStorage.getItem(this.constSrv.loginVariable)) as Login;
    }

    return new Login();
  }

  get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && localStorage.getItem(this.constSrv.tokenVariable) != null) {
      this._token = localStorage.getItem(this.constSrv.tokenVariable);
    }

    return null;
  }

  logon(login: Login): Observable<any> {
    const urlEndpoint = this.constSrv.tokenBackend;

    const credentials = btoa(this.constSrv.appName + this.constSrv.passwordApp);

    const httpHeaders = new HttpHeaders(
      { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', Authorization: 'Basic ' + credentials }
    );

    const params = new URLSearchParams();

    params.set('grant_type', 'password');
    params.set('username', login.usuAlias);
    params.set('password', login.usuClave);

    return this.http.post<any>(urlEndpoint, params.toString(), { headers: httpHeaders });
  }

  saveUser(accessToken: string): void {
    const payload = this.getDataToken(accessToken);

    this._login = new Login();
    this._login.usuID = payload.usuID;
    this._login.usuAlias = payload.user_name;
    this._login.usuClave = payload.password;
    this._login.roles = payload.authorities;
    this._login.permisos = payload.authorities;

    localStorage.setItem(this.constSrv.loginVariable, JSON.stringify(this._login));
  }

  saveToken(accessToken: string): void {
    this._token = accessToken;
    localStorage.setItem(this.constSrv.tokenVariable, accessToken);
  }

  getDataToken(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(window.atob(accessToken.split('.')[1]));
    }
  }

  isAuthenticated(): boolean {
    const payload = this.getDataToken(this.token);

    if (payload != null && payload.user_name.length > 0) {
      return true;
    }

    return false;
  }

  hasRole(roles: string[]): boolean {
    for (const rol of roles) {
      if (this.login.roles.includes(rol)) {
        return true;
      }
    }

    return false;
  }

  hasPermission(permisos: string[]): boolean {
    for (const permiso of permisos) {
      if (this.login.permisos.includes(permiso)) {
        return true;
      }
    }

    return false;
  }

  logout() {
    this._login = null;
    this._token = null;
    localStorage.removeItem(this.constSrv.loginVariable);
    localStorage.removeItem(this.constSrv.tokenVariable);
    localStorage.clear();
  }

  attempLogin(usuID: number): Observable<number> {
    return this.http.post<number>(
      this.constSrv.trySession + 
      usuID, 
      { headers: this.httpHeaders }
    );
  }

  getLoginByUsuID(usuID: number) {
    return this.http.get<Login>(
      this.constSrv.findUsuAlias +
      usuID,
      { headers: this.httpHeaders }
    );
  }
}
