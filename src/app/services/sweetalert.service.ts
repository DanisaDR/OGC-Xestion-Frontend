import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  errorsSwal(errors: string[]) {
    Swal.fire({
      title: '¡AVISO!',
      text: errors.toString(),
      icon: 'warning',
      confirmButtonText: 'OK'
    });
  }

  error401() {
    Swal.fire({
      title: '¡LOGIN INCORRECTO!',
      text: 'O ALIAS e/ou contrasinal está baleiro',
      icon: 'warning',
      confirmButtonText: 'OK'
    });
  }

  error400() {
    Swal.fire({
      title: '¡LOGIN INCORRECTO!',
      text: 'O Alias e/ou contrasinal son incorrectos. Reviseo',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }

  accessDeny(usuAlias: string) {
    Swal.fire({
      title: '¡ACCESO DENEGADO!',
      text: usuAlias + '. NON TES OS PERMISOS SUFICIENTES PARA ACCEDER',
      icon: 'error'
    });
  }

  accountBlock(alias: string) {
    Swal.fire({
      title: '¡AVISO!',
      text: alias + ': A sua conta de acceso foi bloqueada!, Contacte cos/coas ADMINs para que lla desbloqueen',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }

  createUserSwal(message: string[]) {
    Swal.fire({
      title: 'CREACIÓN DE USUARIO/A',
      text: message.toString(),
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }

  updateUserSwal(message: string[]) {
    Swal.fire({
      title: 'ACTUALIZACIÓN DE USUARIO/A',
      text: message.toString(),
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }

  createActSwal(message: string[]) {
    Swal.fire({
      title: 'CREACIÓN DE ACTIVIDADE',
      text: message.toString(),
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }

  updateActSwal(message: any) {
    Swal.fire({
      title: 'ACTUALIZACIÓN DE ACTIVIDADE',
      text: message.toString(),
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }

  createSocSwal(message: string[]) {
    Swal.fire({
      title: 'CREACIÓN DE SOCIO/A',
      text: message.toString(),
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }

  updateSocSwal(message: string[]) {
    Swal.fire({
      title: 'ACTUALIZACIÓN DE SOCIO/A',
      text: message.toString(),
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }

  constructor() { }
}
