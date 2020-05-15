import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  // Establece a Url para comunicación co Backend en Spring Boot + Security + Token JWT
  hostname = 'http://' + location.hostname + ':8080';
  // hostname = 'http://192.168.1.111:8080/xestion';
  readonly baseAppUrl = this.hostname;
  readonly homeUrl = '/inicio';
  readonly trySession = this.hostname + '/login/intento-sesion/';
  readonly tokenBackend = this.hostname + '/oauth/token';
  readonly appName = 'redeoza:';
  // readonly passwordApp = '$2a$10$ORw4bZhjJDwLRVJfdBrdlOnlLvWNOsCPINlHXzaUpaLg87sPpRpVG';
  readonly passwordApp = 'abcd1234.';

  // Operacións cos CRUD básicos: Usuario, Rol, Actividade, Cotas e Socio...
  readonly loginUrl = '/login';
  readonly showUrl = '/ver/';
  readonly listUrl = '/listado';
  readonly createUrl = '/crear';
  readonly updateUrl = '/modificar/';
  readonly deleteUrl = '/borrar/';
  readonly pageUrl = '/paxina/';
  readonly page0Url = '/paxina/0';
  readonly leavingUrl = '/baixa/';

  // Variables a usar para non hardcodear nada.
  readonly loginVariable = 'login';
  readonly tokenVariable = 'token';
  readonly pageVariable = 'paxina';

  // Urls para traballar cos/as usuarios/as
  readonly userUrl = '/usuarios';
  readonly userCompleteUrl = this.hostname + this.userUrl;
  readonly userCompletePagUrl = this.hostname + this.userUrl + this.pageUrl;

  // Urls para traballar co Login
  readonly loginUsuUrl = '/login-usuario/';
  readonly findUsuAlias = this.hostname + this.loginUsuUrl;

  // Urls para traballar cos Roles
  readonly rolUrl = '/roles';
  readonly rolCompleteUrl = this.hostname + this.rolUrl;
  readonly inicio = '/';
  readonly status = this.hostname + this.userUrl + '/cambiar-estado/';

  // Urls para traballar coas actividades
  readonly activUrl = '/actividades';
  readonly activCompleteUrl = this.hostname + this.activUrl;

  // Urls para traballar cos permisos.
  readonly permUrl = '/permisos';
  readonly listPermissionUrl = this.hostname + this.permUrl + '/listado';

  // Urls para cos/as socios/as
  readonly socUrl = '/socios';
  readonly socCompleteUrl = this.hostname + this.socUrl;
  readonly socCompletePagUrl = this.hostname + this.socUrl + this.pageUrl;

  // Urls para as validacións de usuarios/as y socios/as
  readonly usuValidMb = this.hostname + this.userUrl + '/existe-mb/';
  readonly socValidEmail = this.hostname + this.socUrl + '/existe-email/';
  readonly socValidMb = this.hostname + this.socUrl + '/existe-mb/';

  constructor() { }

}
