import { Actividade } from './actividade';
import { Cota } from './cota';

export class Socio {
  socID: number;
  socNom: string;
  soc1Ape: string;
  soc2Ape: string;
  socNomComp: string;
  socEnder: string;
  socPob: string;
  socCP: number;
  socTfnoFx: number;
  socTfnoMb: number;
  socAct: boolean;
  socDataAlta: Date;
  socDataBaixa: Date;
  socEmail: string;

  actividades: Actividade[] = [];

  cotas: Cota[] = [];
}
