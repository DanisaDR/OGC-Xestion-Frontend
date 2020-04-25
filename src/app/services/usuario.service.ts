import { Injectable } from '@angular/core';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { ConstantsService } from './constants.service';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  params = new HttpParams();

  usuarios: Usuario[];
  usuario: Usuario;

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json;charset=utf-8'
  });

  constructor(
    private http: HttpClient,
    private constSrv: ConstantsService,
    private loginSrv: LoginService
  ) { }

  getUsu(usuID: number): Observable<Usuario> {
    return this.http.get<Usuario>(
      this.constSrv.userCompleteUrl +
      this.constSrv.showUrl +
      usuID,
      { headers: this.httpHeaders }
    );
  }

  getUsuList() {
    return this.http.get<Usuario[]>(
      this.constSrv.userCompleteUrl + this.constSrv.listUrl
    );
  }

  getFilter(searchUsuNom: string, searchUsuApe1: string, searchUsuApe2,
            searchUsuEnder: string, searchUsuTfnoFx: string, searchUsuTfnoMb: string,
            page: number, order: any, ordenationType: any): Observable<any> {

    if (order === undefined) {
      order = 'usuID';
    }

    if (ordenationType === undefined) {
      ordenationType = true;
    }

    const parameters = new HttpParams()
      .set('order', order)
      .append('ordenationType', ordenationType)
      .append('searchUsuNom', searchUsuNom)
      .append('searchUsuApe1', searchUsuApe1)
      .append('searchUsuApe2', searchUsuApe2)
      .append('searchUsuEnder', searchUsuEnder)
      .append('searchUsuTfnoFx', searchUsuTfnoFx)
      .append('searchUsuTfnoMb', searchUsuTfnoMb);

    return this.http.get(
      this.constSrv.userCompleteUrl +
      this.constSrv.pageUrl +
      page,
      { headers: this.httpHeaders, params: parameters }
    );
  }

  create(usuario: Usuario): Observable<any> {
    return this.http.post<any>(
      this.constSrv.userCompleteUrl +
      this.constSrv.createUrl,
      usuario,
      { headers: this.httpHeaders }
    );
  }

  update(usuario: Usuario): Observable<any> {
    return this.http.put<any>(
      this.constSrv.userCompleteUrl +
      this.constSrv.updateUrl +
      usuario.usuID,
      usuario,
      { headers: this.httpHeaders }
    );
  }

  delete(usuID: number): Observable<Usuario> {
    return this.http.delete<Usuario>(
      this.constSrv.userCompleteUrl +
      this.constSrv.deleteUrl +
      usuID,
      { headers: this.httpHeaders }
    );
  }

  async changeStatus(usuario: Usuario) {
    return this.http.put<boolean>(
      this.constSrv.status,
      usuario,
      { headers: this.httpHeaders }
    ).toPromise();
  }
}
