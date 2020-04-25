import { Usuario } from './usuario';
import { Socio } from './socio';

export class Actividade {
  actID: number;
  actNom: string;
  actDescr: string;
  actAport: number;
  actDataComezo: Date;
  actDataRemate: Date;

  usuario: Usuario = new Usuario();

  socios: Socio[] = [];
}
