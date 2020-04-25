import { Component, OnInit } from '@angular/core';
import { ActividadeService } from 'src/app/services/actividade.service';
import { Actividade } from 'src/app/models/actividade';
import { Socio } from 'src/app/models/socio';
import { Usuario } from 'src/app/models/usuario';
import { SocioService } from 'src/app/services/socio.service';
import { LoginService } from 'src/app/services/login.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SweetAlertService } from 'src/app/services/sweetalert.service';
import { ConstantsService } from 'src/app/services/constants.service';

@Component({
  selector: 'app-form-actividade',
  templateUrl: './form-actividade.component.html',
  styleUrls: ['./form-actividade.component.css']
})
export class FormActividadeComponent implements OnInit {

  actividades: Actividade[] = [];
  actividade: Actividade = new Actividade();

  socios: Socio[] = [];
  usuario: Usuario;

  editable: boolean;
  errors: string[];

  usuarioSelected: Usuario = null;
  sociosSelected: Socio[] = null;

  createTitle: 'CREAR UNHA ACTIVIDADE';
  updateTitle: 'MODIFICAR UNHA ACTIVIDADE';

  constructor(
    private actSrv: ActividadeService,
    private socSrv: SocioService,
    private usuSrv: UsuarioService,
    private loginSrv: LoginService,
    private activRoute: ActivatedRoute,
    private router: Router,
    private alertSrv: SweetAlertService,
    private constSrv: ConstantsService
  ) { }

  ngOnInit() {
    this.loadUser();
  }

  loadUser(): void {
    this.activRoute.params.subscribe(params => {
      const actID = params.actID;

      if (actID) {
        this.actSrv.getAct(actID).subscribe(actividade => {
          this.actividade = actividade;
          this.socios = this.actividade.socios;
          this.usuario = this.actividade.usuario;
        }, err => {
          this.errors = err.error.errors.messages as string[];
          this.alertSrv.errorsSwal(this.errors);
          return this.router.navigate([this.constSrv.activUrl]);
        });
      }

      this.usuSrv.getUsu(this.usuario.usuID).subscribe(usuario => {
        this.usuario = usuario;
      }, err => {
        this.errors = this.errors = err.error.errors.messages as string[];
        this.alertSrv.errorsSwal(this.errors);
      });

      this.socSrv.getSocList().subscribe(socios => {
        this.socios = socios;
      }, err => {
        this.errors = this.errors = err.error.errors.messages as string[];
        this.alertSrv.errorsSwal(this.errors);
      });
    });
  }

  create(): void {
    this.actividade.socios = this.sociosSelected;
    this.actSrv.create(this.actividade).subscribe(json => {
      this.alertSrv.createActSwal(json.message);
      this.router.navigate([this.constSrv.userUrl]);
    }, err => {
      this.errors = err.error.errors as string[];
      this.alertSrv.errorsSwal(this.errors);
    });
  }

  update(): void {
    this.actSrv.update(this.actividade).subscribe(
      json => {
        this.alertSrv.updateActSwal(json.message);
        this.router.navigate([this.constSrv.activUrl]);
      }, err => {
        this.errors = err.error.errors as string[];
        this.alertSrv.errorsSwal(this.errors);
      }
    );
  }
}
