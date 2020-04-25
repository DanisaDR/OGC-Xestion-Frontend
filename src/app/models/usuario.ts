import { Rol } from './Rol';
import { Actividade } from './actividade';
import { Permiso } from './permiso';
import { Login } from './login';

export class Usuario {
  usuID: number;
  usuNom: string;
  usu1Ape: string;
  usu2Ape: string;
  usuEnder: string;
  usuTfnoFx: number;
  usuTfnoMb: number;
  usuAlias: string;
  usuClave: string;

  roles: Rol[] = [];

  actividades: Actividade[] = [];

  permisos: Permiso[] = [];
}
