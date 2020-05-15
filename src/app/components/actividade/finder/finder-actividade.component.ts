import { Component, OnInit } from '@angular/core';
import { ListActividadeComponent } from '../list/list-actividade.component';
import { Actividade } from 'src/app/models/actividade';

@Component({
  selector: 'app-finder-actividade',
  templateUrl: './finder-actividade.component.html',
  styleUrls: ['./finder-actividade.component.css']
})
export class FinderActividadeComponent implements OnInit {

  actividades: Actividade[];
  paginator: any;

  searchActNom: string;
  searchActAport: number;

  filtro: any;

  constructor(private actComp: ListActividadeComponent) { }

  ngOnInit() {
  }


  applyFilter() {
    if (this.searchActNom === undefined || this.searchActNom === null) {
      this.searchActNom = '';
    }

    if (this.searchActAport === undefined || this.searchActAport === null) {
      this.searchActAport = 0;
    }

    this.actComp.getFind(this.searchActNom,
      this.searchActAport, this.filtro);
  }

  applyReset() {
    this.searchActNom = '';
    this.searchActAport = 0;
    this.actComp.reset();
  }
}
