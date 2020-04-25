import { Injectable } from '@angular/core';
import { Permiso } from '../models/permiso';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstantsService } from './constants.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermisoService {
  permisos: Permiso[];

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });

  constructor(
    private http: HttpClient,
    private constSrv: ConstantsService
  ) { }

  getPermisoList(): Observable<Permiso[]> {
    return this.http.get<Permiso[]>(
      this.constSrv.listPermissionUrl,
      { headers: this.httpHeaders }
    );
  }
}
