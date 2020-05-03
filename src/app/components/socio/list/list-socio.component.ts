import { Component, OnInit } from '@angular/core';
import { Actividade } from 'src/app/models/actividade';
import { Cota } from 'src/app/models/cota';
import { Socio } from 'src/app/models/socio';
import { SocioService } from 'src/app/services/socio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantsService } from 'src/app/services/constants.service';
import { SweetAlertService } from 'src/app/services/sweetalert.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-list-socio',
  templateUrl: './list-socio.component.html',
  styleUrls: ['./list-socio.component.css']
})
export class ListSocioComponent implements OnInit {
  socios: Socio[];
  socio: Socio = new Socio();

  lstActSoc: Actividade[] = [];
  lstCotaSoc: Cota[] = [];

  page: number;
  errors: string[];
  paginator: any;

  visible = false;
  order: string;
  ordenationType: boolean;
  filtro: any;

  searchSocNomComp = '';
  searchSocEnder = '';
  searchSocTfnoFx = '';
  searchSocTfnoMb = '';
  searchSocEmail = '';

  constructor(
    private socSrv: SocioService,
    private activRoute: ActivatedRoute,
    private constSrv: ConstantsService,
    private router: Router,
    private sweetSrv: SweetAlertService,
    private loginSrv: LoginService) { }

  ngOnInit() {
    this.activRoute.paramMap.subscribe(params => {
      // tslint:disable-next-line: prefer-const
      this.page = +params.get(this.constSrv.pageVariable);

      if (!this.page) {
        this.page = 0;
      }

      this.socSrv.getFilter(
        this.searchSocNomComp, this.searchSocEnder, this.searchSocTfnoFx,
        this.searchSocTfnoMb, this.searchSocEmail,
        this.page, this.order, this.ordenationType
      ).subscribe(response => {
        this.paginator = response;
        this.socios = this.paginator.content;
      });
    });
  }

  sortingArrows() {
    this.visible = !this.visible;
  }

  reset() {
    this.searchSocNomComp = '';
    this.searchSocEnder = '';
    this.searchSocTfnoFx = '';
    this.searchSocTfnoMb = '';
    this.searchSocEmail = '';
    this.ordenationType = true;
    this.page = 0;
    this.order = 'socID';
    this.router.navigate([this.constSrv.socUrl + this.constSrv.page0Url]);
  }

  getOrdenation(filtro: any) {
    this.order = filtro;

    if (this.ordenationType) {
      this.ordenationType = false;
    } else {
      this.ordenationType = true;
    }

    this.activRoute.paramMap.subscribe(params => {
      this.page = +params.get(this.constSrv.pageVariable);

      this.socSrv.getFilter(
        this.searchSocNomComp, this.searchSocEnder, this.searchSocTfnoFx,
        this.searchSocTfnoMb, this.searchSocEmail,
        this.page, this.order, this.ordenationType
      ).subscribe(
        response => {
          this.socios = response.content as Socio[];
          this.paginator = response;
        }
      );
    });
  }

  getSoc(socID: number) {
    return this.socSrv.getSoc(socID).subscribe(
      response => {
        this.socio = response;
      }, err => {
        this.sweetSrv.errorsSwal(err);
      }
    );
  }

  getFind(searchSocNomComp: string, searchSocEnder: string,
          searchSocTfnoFx: string, searchSocTfnoMb: string,
          searchSocEmail: string, filtro: any) {
    this.order = filtro;
    this.page = 0;

    this.searchSocNomComp = searchSocNomComp;
    this.searchSocEnder = searchSocEnder;
    this.searchSocTfnoFx = searchSocTfnoFx;
    this.searchSocTfnoMb = searchSocTfnoMb;
    this.searchSocEmail = searchSocEmail;

    if (this.ordenationType) {
      this.ordenationType = false;
    } else {
      this.ordenationType = true;
    }

    this.socSrv.getFilter(
      searchSocNomComp, searchSocEnder,
      searchSocTfnoFx, searchSocTfnoMb, searchSocEmail,
      this.page, this.order, this.ordenationType).subscribe(response => {
        this.socios = response.content as Socio[];
        this.paginator = response;
      }
    );
  }

  refreshListAct(lstActSoc: Actividade[]) {
    this.lstActSoc = lstActSoc;
  }

  refreshListCota(lstCotaSoc: Cota[]) {
    this.lstCotaSoc = lstCotaSoc;
  }
}
