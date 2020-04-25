import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ConstantsService } from './constants.service';
import { Observable } from 'rxjs';
import { Rol } from '../models/Rol';
import { Permiso } from '../models/permiso';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf8' });

  constructor(
    private http: HttpClient,
    private constSrv: ConstantsService
  ) { }

  getRol(rolID: number) {
    return this.http.get<Rol>(
      this.constSrv.rolCompleteUrl +
      this.constSrv.showUrl +
      rolID,
      { headers: this.httpHeaders }
    );
  }

  update(rol: Rol): Observable<any> {
    return this.http.put<any>(
      this.constSrv.rolCompleteUrl +
      this.constSrv.updateUrl +
      rol.rolID,
      { headers: this.httpHeaders }
    );
  }

  getRolesList(): Observable<Rol[]> {
    return this.http.get<Rol[]>(
      this.constSrv.rolCompleteUrl +
      this.constSrv.listUrl,
      { headers: this.httpHeaders }
    );
  }

  getPermissionList(): Observable<Permiso[]> {
    return this.http.get<Permiso[]>(
      this.constSrv.rolCompleteUrl +
      this.constSrv.listPermissionUrl,
      { headers: this.httpHeaders }
    );
  }
}
