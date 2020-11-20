import {Component, OnInit} from '@angular/core';
import {Rol} from 'src/app/models/Rol';
import {RolService} from 'src/app/services/rol.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ConstantsService} from 'src/app/services/constants.service';
import {SweetAlertService} from 'src/app/services/sweetalert.service';
import {LoginService} from 'src/app/services/login.service';
import {Permiso} from 'src/app/models/permiso';
import {Usuario} from 'src/app/models/usuario';

@Component({
  selector: 'app-list-rol',
  templateUrl: './list-rol.component.html',
  styleUrls: ['./list-rol.component.css'],
})
export class ListRolComponent implements OnInit {
  roles: Rol[];
  rol: Rol = new Rol();

  errors: string[];

  lstRolPerm: Permiso[] = [];
  lstRolUsu: Usuario[] = [];

  paginator: any;

  constructor(
    private rolSrv: RolService,
    private activRoute: ActivatedRoute,
    private constSrv: ConstantsService,
    private router: Router,
    private alertSrv: SweetAlertService,
    public loginSrv: LoginService,
  ) {}

  ngOnInit() {
    this.rolSrv.getRolesList().subscribe(
      (roles) => {
        this.roles = roles;
      },
      (err) => {
        this.errors = err.error.errors as string[];
        this.alertSrv.errorsSwal(this.errors);
      },
    );
  }

  getRol(rolID: number) {
    return this.rolSrv.getRol(rolID).subscribe(
      (response) => {
        this.rol = response;
      },
      (err) => {
        this.errors = err.error.errors as string[];
        this.alertSrv.errorsSwal(this.errors);
      },
    );
  }

  refreshListPerm(lstRolPerm: Permiso[]) {
    this.lstRolPerm = lstRolPerm;
  }

  refreshListUsu(lstRolUsu: Usuario[]) {
    this.lstRolUsu = lstRolUsu;
  }
}
