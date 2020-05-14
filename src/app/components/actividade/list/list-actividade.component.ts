import { Component, OnInit } from '@angular/core';
import { Actividade } from 'src/app/models/actividade';
import { Socio } from 'src/app/models/socio';
import { Usuario } from 'src/app/models/usuario';
import { ActividadeService } from 'src/app/services/actividade.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantsService } from 'src/app/services/constants.service';
import { SweetAlertService } from 'src/app/services/sweetalert.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-list-actividade',
  templateUrl: './list-actividade.component.html',
  styleUrls: ['./list-actividade.component.css']
})
export class ListActividadeComponent implements OnInit {

  actividades: Actividade[] = [];
  actividade: Actividade;
  errors: string[];

  paginator: any;
  page: number;

  visible = false;
  order: string;
  ordenationType: boolean;
  filtro: any;

  searchActNom = '';
  searchActAport = 0;

  lstSoc: Socio[] = [];

  usuario: Usuario;

  constructor(
    private actSrv: ActividadeService,
    private activRoute: ActivatedRoute,
    private constSrv: ConstantsService,
    private router: Router,
    private sweetSrv: SweetAlertService,
    private loginSrv: LoginService
  ) { }

  ngOnInit() {
    this.initialLoad();
  }

  initialLoad() {
    this.activRoute.paramMap.subscribe(params => {
      // tslint:disable-next-line: prefer-const
      this.page = +params.get(this.constSrv.pageVariable);

      if (!this.page) {
        this.page = 0;
      }

      this.actSrv.getFilter(
        this.searchActNom, this.searchActAport,
        this.page, this.order, this.ordenationType
      ).subscribe(response => {
        this.paginator = response;
        this.actividades = this.paginator.content;
      });
    });
  }

  loadWithParams() {
    this.activRoute.paramMap.subscribe(params => {
      const page: number = +params.get(this.constSrv.pageVariable);

      this.actSrv.getFilter(this.searchActNom, this.searchActAport,
        this.page, this.order, this.ordenationType)
        .subscribe(
          response => {
            this.actividades = response.content as Actividade[];
            this.paginator = response;
          }
        );
      }
    );
  }

  sortingArrows() {
    this.visible = !this.visible;
  }

  reset() {
    this.searchActNom = '';
    this.searchActAport = 0;
    this.ngOnInit();
  }

  getOrdenation(filtro: any) {
    this.order = filtro;

    if (this.ordenationType) {
      this.ordenationType = false;
    } else {
      this.ordenationType = true;
    }

    this.loadWithParams();
  }

  getAct(actID: number) {
    return this.actSrv.getAct(actID).subscribe(
      response => {
        this.actividade = response;
      }, err => {
        this.sweetSrv.errorsSwal(err);
      }
    );
  }

  getFind(searchActNom: string, searchActAport: number, filtro: any) {
    this.order = filtro;
    this.page = 0;

    this.searchActNom = searchActNom;
    this.searchActAport = searchActAport;

    if (this.ordenationType) {
      this.ordenationType = false;
    } else {
      this.ordenationType = true;
    }

    this.actSrv.getFilter(
      this.searchActNom, this.searchActAport,
      this.page, this.order, this.ordenationType).
      subscribe(response => {
        this.actividades = response.content as Actividade[];
        this.paginator = response;
      }
    );
  }
}
