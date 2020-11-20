import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {RolService} from 'src/app/services/rol.service';
import {LoginService} from 'src/app/services/login.service';
import {UsuarioService} from 'src/app/services/usuario.service';
import {PermisoService} from 'src/app/services/permiso.service';
import {SweetAlertService} from 'src/app/services/sweetalert.service';
import {ConstantsService} from 'src/app/services/constants.service';

import {Rol} from 'src/app/models/Rol';
import {Permiso} from 'src/app/models/permiso';
import {Usuario} from 'src/app/models/usuario';

@Component({
  selector: 'app-form-rol',
  templateUrl: './form-rol.component.html',
  styleUrls: ['./form-rol.component.css'],
})
export class FormRolComponent implements OnInit {
  permisos: Permiso[] = [];
  usuarios: Usuario[] = [];
  rol: Rol = new Rol();

  createTitle: string;

  errors: string[];

  constructor(
    private rolSrv: RolService,
    private permSrv: PermisoService,
    private usuSrv: UsuarioService,
    private alertSrv: SweetAlertService,
    private constSrv: ConstantsService,
    private login: LoginService,
    private rolRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.permSrv.getPermisoList().subscribe(
      (permisos) => {
        this.permisos = permisos;
      },
      (err) => {
        this.errors = err.error.errors as string[];
        this.alertSrv.errorsSwal(this.errors);
      },
    );

    this.usuSrv.getUsuList().subscribe(
      (usuarios) => {
        this.usuarios = usuarios;
      },
      (err) => {
        this.errors = err.error.errors as string[];
        this.alertSrv.errorsSwal(this.errors);
      },
    );

    this.loadRol();
  }

  loadRol(): void {
    this.rolRoute.params.subscribe((params) => {
      const rolID = params.rolID;

      if (rolID) {
        this.rolSrv.getRol(rolID).subscribe(
          (rol) => {
            this.rol = rol;
            this.permisos = this.rol.permisos;
            this.usuarios = this.rol.usuarios;
          },
          (err) => {
            this.errors = err.error.errors as string[];
            this.alertSrv.errorsSwal(this.errors);
            return this.router.navigate([this.constSrv.userUrl]);
          },
        );
      }

      this.permSrv.getPermisoList().subscribe(
        (permisos) => {
          this.permisos = permisos;
        },
        (err) => {
          this.errors = err.error.errors as string[];
          this.alertSrv.errorsSwal(this.errors);
        },
      );

      this.usuSrv.getUsuList().subscribe(
        (usuarios) => {
          this.usuarios = usuarios;
        },
        (err) => {
          this.errors = err.error.errors as string[];
          this.alertSrv.errorsSwal(this.errors);
        },
      );
    });
  }

  update(): void {
    this.rolSrv.update(this.rol).subscribe(
      (json) => {
        this.alertSrv.updateUserSwal(json.message);
        this.router.navigate([this.constSrv.rolUrl]);
      },
      (err) => {
        this.errors = err.error.errors as string[];
        this.alertSrv.errorsSwal(this.errors);
      },
    );
  }
}
