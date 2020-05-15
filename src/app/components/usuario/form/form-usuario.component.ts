import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { Login } from 'src/app/models/login';
import { Actividade } from 'src/app/models/actividade';
import { Rol } from 'src/app/models/Rol';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LoginService } from 'src/app/services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SweetAlertService } from 'src/app/services/sweetalert.service';
import { RolService } from 'src/app/services/rol.service';
import { ConstantsService } from 'src/app/services/constants.service';
import { ActividadeService } from 'src/app/services/actividade.service';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css']
})
export class FormUsuarioComponent implements OnInit {

  usuarios: Usuario[] = [];
  usuario: Usuario = new Usuario();

  roles: Rol[] = [];
  actividades: Actividade[] = [];
  login: Login = new Login();

  editable: boolean;
  errors: string[];

  rolesSelected: Rol[] = null;
  activSelected: Actividade[] = null;

  createTitle: 'CREAR UN/HA USUARIO/A';
  updateTitle: 'MODIFICAR UN/HA USUARIO/A';

  constructor(
    private usuSrv: UsuarioService,
    private rolSrv: RolService,
    private actSrv: ActividadeService,
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
      const usuID = params.usuID;

      if (usuID) {
        this.usuSrv.getUsu(usuID).subscribe(usuario => {
          this.usuario = usuario;
          this.roles = this.usuario.roles;
          this.actividades = this.usuario.actividades;
          this.loginSrv.getLoginByUsuID(usuID).subscribe(login => {
            this.usuario.usuAlias = login.usuAlias;
          });
        }, err => {
          this.errors = err.error.errors.messages as string[];
          this.alertSrv.errorsSwal(this.errors);
          return this.router.navigate([this.constSrv.userUrl]);
        });
      }

      this.rolSrv.getRolesList().subscribe(roles => {
        this.roles = roles;
      }, err => {
        this.errors = this.errors = err.error.errors.messages as string[];
        this.alertSrv.errorsSwal(this.errors);
      });

      this.actSrv.getActList().subscribe(actividades => {
        this.actividades = actividades;
      }, err => {
        this.errors = this.errors = err.error.errors.messages as string[];
        this.alertSrv.errorsSwal(this.errors);
      });
    });
  }

  create(): void {
    this.usuario.roles = this.rolesSelected;
    this.usuSrv.create(this.usuario).subscribe(json => {
      this.alertSrv.createUserSwal(json.message);
      this.router.navigate([this.constSrv.userUrl]);
    }, err => {
      this.errors = err.error.errors as string[];
      this.alertSrv.errorsSwal(this.errors);
    });
  }

  update(): void {
    this.usuSrv.update(this.usuario).subscribe(
      json => {
        this.alertSrv.updateUserSwal(json.message);
        this.router.navigate([this.constSrv.userUrl]);
      }, err => {
        this.errors = err.error.errors as string[];
        this.alertSrv.errorsSwal(this.errors);
      }
    );
  }
}
