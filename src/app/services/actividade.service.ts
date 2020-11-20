import {Injectable} from '@angular/core';
import {HttpParams, HttpHeaders, HttpClient} from '@angular/common/http';
import {Actividade} from '../models/actividade';
import {ConstantsService} from './constants.service';
import {LoginService} from './login.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActividadeService {
  params = new HttpParams();

  actividades: Actividade[];
  actividade: Actividade;

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json;charset=utf-8',
  });

  constructor(
    private http: HttpClient,
    private constSrv: ConstantsService,
    public loginSrv: LoginService,
  ) {}

  getAct(actID: number): Observable<Actividade> {
    return this.http.get<Actividade>(
      this.constSrv.activCompleteUrl + this.constSrv.showUrl + actID,
      {headers: this.httpHeaders},
    );
  }

  getActList() {
    return this.http.get<Actividade[]>(
      this.constSrv.activCompleteUrl + this.constSrv.listUrl,
    );
  }

  getFilter(
    searchActNom: string,
    searchActAport: number,
    page: number,
    order: any,
    ordenationType: any,
  ): Observable<any> {
    if (order === undefined) {
      order = 'actID';
    }

    if (ordenationType === undefined) {
      ordenationType = true;
    }

    const parameters = new HttpParams()
      .set('order', order)
      .append('ordenationType', ordenationType)
      .append('searchActNom', searchActNom)
      .append('searchActAport', searchActAport.toString());

    return this.http.get(
      this.constSrv.activCompleteUrl + this.constSrv.pageUrl + page,
      {headers: this.httpHeaders, params: parameters},
    );
  }

  create(actividade: Actividade): Observable<any> {
    return this.http.post<any>(
      this.constSrv.activCompleteUrl + this.constSrv.createUrl,
      actividade,
      {headers: this.httpHeaders},
    );
  }

  update(actividade: Actividade): Observable<any> {
    return this.http.put<any>(
      this.constSrv.activCompleteUrl +
        this.constSrv.updateUrl +
        actividade.actID,
      actividade,
      {headers: this.httpHeaders},
    );
  }

  delete(actID: number): Observable<Actividade> {
    return this.http.delete<Actividade>(
      this.constSrv.activCompleteUrl + this.constSrv.deleteUrl + actID,
      {headers: this.httpHeaders},
    );
  }
}
