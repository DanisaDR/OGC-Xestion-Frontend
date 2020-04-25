import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { ListUsuarioComponent } from '../list/list-usuario.component';

@Component({
  selector: 'app-finder-usuario',
  templateUrl: './finder-usuario.component.html',
  styleUrls: ['./finder-usuario.component.css']
})
export class FinderUsuarioComponent implements OnInit {

  usuarios: Usuario[];

  paginator: any;
  searchUsuNom: string;
  searchUsuApe1: string;
  searchUsuApe2: string;
  searchUsuEnder: string;
  searchUsuTfnoFx: string;
  searchUsuTfnoMb: string;
  filtro: any;

  constructor(private usuComp: ListUsuarioComponent) { }

  ngOnInit() {
  }

  applyFilter() {
    if (this.searchUsuNom === undefined || this.searchUsuNom === null) {
      this.searchUsuNom = '';
    }

    if (this.searchUsuApe1 === undefined || this.searchUsuApe1 === null) {
      this.searchUsuApe1 = '';
    }

    if (this.searchUsuApe2 === undefined || this.searchUsuApe2 === null) {
      this.searchUsuApe2 = '';
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

    this.usuComp.getFind(this.searchUsuNom, this.searchUsuApe1, this.searchUsuApe2,
                        this.searchUsuEnder, this.searchUsuTfnoFx, this.searchUsuTfnoMb,
                        this.filtro);
  }

  applyReset() {
    this.searchUsuNom = '';
    this.searchUsuApe1 = '';
    this.searchUsuApe2 = '';
    this.searchUsuEnder = '';
    this.searchUsuTfnoFx = '';
    this.searchUsuTfnoMb = '';
    this.usuComp.reset();
  }
}
