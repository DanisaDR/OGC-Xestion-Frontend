import { Rol } from './Rol';

export class Permiso {
  permisoID: number;
  permisoNom: string;
  permisoDescr: string;

  roles: Rol[] = [];
}
