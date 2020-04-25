import { Usuario } from './usuario';
import { Permiso } from './permiso';

export class Rol {
  rolID: number;
  rolNome: string;
  rolDescr: string;

  usuarios: Usuario[] = [];

  permisos: Permiso[] = [];
}
