import { Component, OnInit } from '@angular/core';
import { ListSocioComponent } from '../list/list-socio.component';
import { Socio } from 'src/app/models/socio';

@Component({
  selector: 'app-finder-socio',
  templateUrl: './finder-socio.component.html',
  styleUrls: ['./finder-socio.component.css']
})
export class FinderSocioComponent implements OnInit {

  socios: Socio[];
  paginator: any;

  searchSocNomComp: string;
  searchSocEnder: string;
  searchSocTfnoFx: string;
  searchSocTfnoMb: string;
  searchSocEmail: string;

  filtro: any;

  constructor(private socComp: ListSocioComponent) { }

  ngOnInit() {
  }

  applyFilter() {
    if (this.searchSocNomComp === undefined || this.searchSocNomComp === null) {
      this.searchSocNomComp = '';
    }

    if (this.searchSocEnder === undefined || this.searchSocEnder === null) {
      this.searchSocEnder = '';
    }

    if (this.searchSocTfnoFx === undefined || this.searchSocTfnoFx === null) {
      this.searchSocTfnoFx = '';
    }

    if (this.searchSocTfnoMb === undefined || this.searchSocTfnoMb === null) {
      this.searchSocTfnoMb = '';
    }

    if (this.searchSocEmail === undefined || this.searchSocTfnoMb === null) {
      this.searchSocEmail = '';
    }

    this.socComp.getFind(
      this.searchSocNomComp, this.searchSocEnder, this.searchSocTfnoFx,
      this.searchSocTfnoMb, this.searchSocEmail, this.filtro);
  }

  applyReset() {
    this.searchSocNomComp = '';
    this.searchSocEnder = '';
    this.searchSocTfnoFx =  '';
    this.searchSocTfnoMb = '';
    this.searchSocEmail = '';
    this.socComp.reset();
  }
}
