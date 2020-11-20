import {Component, OnInit} from '@angular/core';
import {Cota} from 'src/app/models/cota';
import {Socio} from 'src/app/models/socio';
import {Actividade} from 'src/app/models/actividade';
import {SocioService} from 'src/app/services/socio.service';
import {CotaService} from 'src/app/services/cota.service';
import {ActividadeService} from 'src/app/services/actividade.service';
import {LoginService} from 'src/app/services/login.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SweetAlertService} from 'src/app/services/sweetalert.service';
import {ConstantsService} from 'src/app/services/constants.service';
import {FormArray, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-form-socio',
  templateUrl: './form-socio.component.html',
  styleUrls: ['./form-socio.component.css'],
})
export class FormSocioComponent implements OnInit {
  socios: Socio[] = [];
  socio: Socio = new Socio();
  cotas: Cota[] = [];
  actividades: Actividade[] = [];
  cota = new Cota();

  dateValue: Date = new Date(0);
  dateNow: Date = new Date();
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
    public loginSrv: LoginService,
    private activRoute: ActivatedRoute,
    private router: Router,
    private alertSrv: SweetAlertService,
    private constSrv: ConstantsService,
  ) {}

  ngOnInit() {
    this.loadSocio();
  }

  loadSocio(): void {
    this.activRoute.params.subscribe((params) => {
      const socID = params.socID;

      if (socID) {
        this.socSrv.getSoc(socID).subscribe(
          (socio) => {
            this.socio = socio;
            this.socio.socDataAlta = new Date(socio.socDataAlta);

            if (socio.socDataBaixa === null) {
              this.socio.socDataBaixa = null;
            } else if (
              socio.socDataBaixa.toString() !== '1900-01-01T00:00:00.000+0100'
            ) {
              this.socio.socDataBaixa = new Date(socio.socDataBaixa);
            } else {
              this.socio.socDataBaixa = null;
            }

            this.actividades = this.socio.actividades;
          },
          (err) => {
            this.errors = err.error.errors as string[];
            this.alertSrv.errorsSwal(this.errors);
            return this.router.navigate([this.constSrv.socUrl]);
          },
        );
      } else {
        this.socio.cotas = [];
        this.cota.cotaImporte = 0;
        this.cota.cotaAnual = new Date().getFullYear();
        this.socio.cotas.push(this.cota);
      }

      this.socio.socDataAlta = new Date();

      this.actSrv.getActList().subscribe(
        (actividades) => {
          this.actividades = actividades;
        },
        (err) => {
          this.errors = this.errors = err.error.errors as string[];
          this.alertSrv.errorsSwal(this.errors);
        },
      );
    });
  }

  create(): void {
    this.socio.socNomComp = this.socio.socApe2
      .concat(' ')
      .concat(this.socio.socApe1)
      .concat(', ')
      .concat(this.socio.socNom);
    this.socSrv.create(this.socio).subscribe(
      (json) => {
        this.alertSrv.createSocSwal(json.message);
        this.router.navigate([this.constSrv.socUrl]);
      },
      (err) => {
        this.errors = err.error.errors as string[];
        this.alertSrv.errorsSwal(this.errors);
      },
    );
  }

  update(): void {
    this.socSrv.update(this.socio).subscribe(
      (json) => {
        this.alertSrv.updateSocSwal(json.message);
        this.router.navigate([this.constSrv.socUrl]);
      },
      (err) => {
        this.errors = err.error.errors as string[];
        this.alertSrv.errorsSwal(this.errors);
      },
    );
  }

  getAllErrors(form: FormGroup | FormArray): {[key: string]: any} | null {
    let hasError = false;
    const result = Object.keys(form.controls).reduce((acc, key) => {
      const control = form.get(key);
      const errors =
        control instanceof FormGroup || control instanceof FormArray
          ? this.getAllErrors(control)
          : control.errors;
      if (errors) {
        acc[key] = errors;
        hasError = true;
      }
      return acc;
    }, {} as {[key: string]: any});
    return hasError ? result : null;
  }
}
