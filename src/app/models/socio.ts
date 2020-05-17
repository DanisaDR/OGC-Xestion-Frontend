import { Actividade } from './actividade';
import { Cota } from './cota';

export class Socio {
  socID: number;
  socNom: string;
  socApe1: string;
  socApe2: string;
  socNomComp: string;
  socEnder: string;
  socPob: string;
  socCP: number;
  socTfnoFx: string;
  socTfnoMb: string;
  socAct: boolean;
  socDataAlta: Date;
  socDataBaixa: Date;
  socEmail: string;

  actividades: Actividade[] = [];

  cotas: Cota[] = [];
}
