import {Component, OnInit} from '@angular/core';
import {Usuario} from 'src/app/models/usuario';
import {ListUsuarioComponent} from '../list/list-usuario.component';

@Component({
  selector: 'app-finder-usuario',
  templateUrl: './finder-usuario.component.html',
  styleUrls: ['./finder-usuario.component.css'],
})
export class FinderUsuarioComponent implements OnInit {
  usuarios: Usuario[];

  paginator: any;
  searchUsuNom: string;
  searchusu1Ape: string;
  searchusu2Ape: string;
  searchUsuEnder: string;
  searchUsuTfnoFx: string;
  searchUsuTfnoMb: string;
  filtro: any;

  constructor(private usuComp: ListUsuarioComponent) {}

  ngOnInit() {}

  applyFilter() {
    if (this.searchUsuNom === undefined || this.searchUsuNom === null) {
      this.searchUsuNom = '';
    }

    if (this.searchusu1Ape === undefined || this.searchusu1Ape === null) {
      this.searchusu1Ape = '';
    }

    if (this.searchusu2Ape === undefined || this.searchusu2Ape === null) {
      this.searchusu2Ape = '';
    }

    if (this.searchUsuEnder === undefined || this.searchUsuEnder === null) {
      this.searchUsuEnder = '';
    }

    if (this.searchUsuTfnoFx === undefined || this.searchUsuTfnoFx === null) {
      this.searchUsuTfnoFx = '';
    }

    if (this.searchUsuTfnoMb === undefined || this.searchUsuTfnoMb === null) {
      this.searchUsuTfnoMb = '';
    }

    this.usuComp.getFind(
      this.searchUsuNom,
      this.searchusu1Ape,
      this.searchusu2Ape,
      this.searchUsuEnder,
      this.searchUsuTfnoFx,
      this.searchUsuTfnoMb,
      this.filtro,
    );
  }

  applyReset() {
    this.searchUsuNom = '';
    this.searchusu1Ape = '';
    this.searchusu2Ape = '';
    this.searchUsuEnder = '';
    this.searchUsuTfnoFx = '';
    this.searchUsuTfnoMb = '';
    this.usuComp.reset();
  }
}
