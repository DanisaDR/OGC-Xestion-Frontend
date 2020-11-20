import {Injectable} from '@angular/core';
import {HttpParams, HttpHeaders, HttpClient} from '@angular/common/http';
import {Socio} from '../models/socio';
import {ConstantsService} from './constants.service';
import {LoginService} from './login.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocioService {
  params = new HttpParams();

  socios: Socio[];
  socio: Socio;

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json;charset=utf-8',
  });

  constructor(
    private http: HttpClient,
    private constSrv: ConstantsService,
    public loginSrv: LoginService,
  ) {}

  getSoc(socID: number): Observable<Socio> {
    return this.http.get<Socio>(
      this.constSrv.socCompleteUrl + this.constSrv.showUrl + socID,
      {headers: this.httpHeaders},
    );
  }

  getSocList() {
    return this.http.get<Socio[]>(
      this.constSrv.socCompleteUrl + this.constSrv.listUrl,
    );
  }

  getFilter(
    searchSocNomComp: string,
    searchSocEnder: string,
    searchSocTfnoFx: string,
    searchSocTfnoMb: string,
    searchSocEmail: string,
    page: number,
    order: any,
    ordenationType: any,
  ): Observable<any> {
    if (order === undefined) {
      order = 'socID';
    }

    if (ordenationType === undefined) {
      ordenationType = true;
    }

    const parameters = new HttpParams()
      .set('order', order)
      .append('ordenationType', ordenationType)
      .append('searchSocNomComp', searchSocNomComp)
      .append('searchSocEnder', searchSocEnder)
      .append('searchSocTfnoFx', searchSocTfnoFx)
      .append('searchSocTfnoMb', searchSocTfnoMb)
      .append('searchSocEmail', searchSocEmail);

    return this.http.get(this.constSrv.socCompletePagUrl + page, {
      headers: this.httpHeaders,
      params: parameters,
    });
  }

  create(socio: Socio): Observable<any> {
    return this.http.post<any>(
      this.constSrv.socCompleteUrl + this.constSrv.createUrl,
      socio,
      {headers: this.httpHeaders},
    );
  }

  update(socio: Socio): Observable<any> {
    return this.http.put<any>(
      this.constSrv.socCompleteUrl + this.constSrv.updateUrl + socio.socID,
      socio,
      {headers: this.httpHeaders},
    );
  }

  delete(socID: number) {
    return this.http.put<Socio>(
      this.constSrv.socCompleteUrl + this.constSrv.leavingUrl + socID,
      {headers: this.httpHeaders},
    );
  }

  async checkEmailSoc(email: string, socID: number): Promise<boolean> {
    if (email === undefined || email === null || email === '') {
      email = '';
    } else {
      email = '/' + email;
    }
    return await this.http
      .post<boolean>(this.constSrv.socValidEmail + socID + email, {
        headers: this.httpHeaders,
      })
      .toPromise();
  }

  async checkMbSoc(tfnoMb: string, socID: number): Promise<boolean> {
    if (tfnoMb === undefined || tfnoMb === null || tfnoMb === '') {
      tfnoMb = '';
    } else {
      tfnoMb = '/' + tfnoMb;
    }
    return await this.http
      .post<boolean>(this.constSrv.socValidMb + socID + tfnoMb, {
        headers: this.httpHeaders,
      })
      .toPromise();
  }
}
