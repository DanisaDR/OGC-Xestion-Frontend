import { Component, OnInit } from '@angular/core';
import { Cota } from 'src/app/models/cota';
import { Socio } from 'src/app/models/socio';
import { Actividade } from 'src/app/models/actividade';
import { SocioService } from 'src/app/services/socio.service';
import { CotaService } from 'src/app/services/cota.service';
import { ActividadeService } from 'src/app/services/actividade.service';
import { LoginService } from 'src/app/services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SweetAlertService } from 'src/app/services/sweetalert.service';
import { ConstantsService } from 'src/app/services/constants.service';

@Component({
  selector: 'app-form-socio',
  templateUrl: './form-socio.component.html',
  styleUrls: ['./form-socio.component.css']
})
export class FormSocioComponent implements OnInit {

  socios: Socio[] = [];
  socio: Socio = new Socio();
  cotas: Cota[] = [];
  actividades: Actividade[] = [];

  public dateValue: Date = new Date ();

  editable: boolean;
  errors: string[];

  cotasSelected: Cota[] = null;
  activSelected: Actividade[] = null;

  createTitle: 'CREAR UN/HA SOCIO/A';
  updateTitle: 'MODIFICAR UN/HA SOCIO/A';

  constructor(
    private socSrv: SocioService,
    private cotaSrv: CotaService,
    private actSrv: ActividadeService,
    private loginSrv: LoginService,
    private activRoute: ActivatedRoute,
    private router: Router,
    private alertSrv: SweetAlertService,
    private constSrv: ConstantsService
  ) { }

  ngOnInit() {
    this.loadSocio();
  }

  loadSocio(): void {
    this.activRoute.params.subscribe(params => {
      const socID = params.socID;

      if (socID) {
        this.socSrv.getSoc(socID).subscribe(socio => {
          this.socio = socio;
          this.actividades = this.socio.actividades;
        }, err => {
          this.errors = err.error.errors as string[];
          this.alertSrv.errorsSwal(this.errors);
          return this.router.navigate([this.constSrv.socUrl]);
        });
      }

      this.actSrv.getActList().subscribe(actividades => {
        this.actividades = actividades;
      }, err => {
        this.errors = this.errors = err.error.errors as string[];
        this.alertSrv.errorsSwal(this.errors);
      });
    });
  }

  create(): void {
    this.socSrv.create(this.socio).subscribe(json => {
      this.alertSrv.createSocSwal(json.message);
      this.router.navigate([this.constSrv.socUrl]);
    }, err => {
      this.errors = err.error.errors as string[];
      this.alertSrv.errorsSwal(this.errors);
    });
  }

  update(): void {
    this.socSrv.update(this.socio).subscribe(
      json => {
        this.alertSrv.updateSocSwal(json.message);
        this.router.navigate([this.constSrv.socUrl]);
      }, err => {
        this.errors = err.error.errors as string[];
        this.alertSrv.errorsSwal(this.errors);
      }
    );
  }
}
