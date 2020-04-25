import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { Rol } from 'src/app/models/Rol';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantsService } from 'src/app/services/constants.service';
import { SweetAlertService } from 'src/app/services/sweetalert.service';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/services/login.service';
import { Actividade } from 'src/app/models/actividade';

@Component({
  selector: 'app-list-usuario',
  templateUrl: './list-usuario.component.html',
  styleUrls: ['./list-usuario.component.css']
})
export class ListUsuarioComponent implements OnInit {

  usuarios: Usuario[] = [];
  usuario: Usuario;
  errors: string[];

  paginator: any;
  page: number;

  visible = false;
  order: string;
  ordenationType: boolean;
  filtro: any;

  searchUsuNom = '';
  searchUsuApe1 = '';
  searchUsuApe2 = '';
  searchUsuEnder = '';
  searchUsuTfnoFx = '';
  searchUsuTfnoMb = '';

  lstRoles: Rol[] = [];
  lstAct: Actividade[] = [];

  constructor(
    private usuSrv: UsuarioService,
    private activRoute: ActivatedRoute,
    private constSrv: ConstantsService,
    private router: Router,
    private sweetSrv: SweetAlertService,
    private loginSrv: LoginService
  ) { }

  ngOnInit() {
    this.activRoute.paramMap.subscribe(params => {
      // tslint:disable-next-line: prefer-const
      let page: number = +params.get(this.constSrv.pageVariable);

      if (!page) {
        page = 0;
      }

      this.usuSrv.getFilter(
        this.searchUsuNom, this.searchUsuApe1, this.searchUsuApe2,
        this.searchUsuEnder, this.searchUsuTfnoFx, this.searchUsuTfnoMb,
        page, this.order, this.ordenationType
      ).subscribe(response => {
        this.paginator = response;
        this.usuarios = this.paginator.content;
      });
    });
  }

  sortingArrows() {
    this.visible = !this.visible;
  }

  reset() {
    this.searchUsuNom = '';
    this.searchUsuApe1 = '';
    this.searchUsuApe2 = '';
    this.searchUsuEnder = '';
    this.searchUsuTfnoFx = '';
    this.searchUsuTfnoMb = '';
    this.order = '';
    this.router.navigate([this.constSrv.userUrl + this.constSrv.page0Url]);
  }

  getOrdenation(filtro: any) {
    this.order = filtro;

    if (this.ordenationType) {
      this.ordenationType = false;
    } else {
      this.ordenationType = true;
    }

    this.activRoute.paramMap.subscribe(params => {
      const page: number = +params.get(this.constSrv.pageVariable);

      this.usuSrv.getFilter(
        this.searchUsuNom, this.searchUsuApe1, this.searchUsuApe2,
        this.searchUsuEnder, this.searchUsuTfnoFx, this.searchUsuTfnoMb,
        page, this.order, this.ordenationType
      ).subscribe(
        response => {
          this.usuarios = response.content as Usuario[];
          this.paginator = response;
        }
      );
    });
  }

  getUser(usuID: number) {
    return this.usuSrv.getUsu(usuID).subscribe(
      response => {
        this.usuario = response;
      }, err => {
        this.sweetSrv.errorsSwal(err);
      }
    );
  }

  getFind(searchUsuNom: string, searchUsuApe1: string, searchUsuApe2: string,
          searchUsuEnder: string, searchUsuTfnoFx: string, searchUsuTfnoMb: string, filtro: any) {
      this.order = filtro;

      if (this.ordenationType) {
        this.ordenationType = false;
      } else {
        this.ordenationType = true;
      }

      this.activRoute.paramMap.subscribe(params => {
        const page: number = +params.get('page');

        this.searchUsuNom = searchUsuNom;
        this.searchUsuApe1 = searchUsuApe1;
        this.searchUsuApe2 = searchUsuApe2;
        this.searchUsuEnder = searchUsuEnder;
        this.searchUsuTfnoFx = searchUsuTfnoFx;
        this.searchUsuTfnoMb = searchUsuTfnoMb;

        this.usuSrv.getFilter(
          this.searchUsuNom, this.searchUsuApe1, this.searchUsuApe2,
          this.searchUsuEnder, this.searchUsuTfnoFx, this.searchUsuTfnoMb,
          page, this.order, this.ordenationType).subscribe(response => {
            this.usuarios = response.content as Usuario[];
            this.paginator = response;
          }
        );
      });
  }

  delete(usuario: Usuario): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true
    });

    swalWithBootstrapButtons.fire({
      title: `Estás seguro de desexa eliminar ${usuario.usuAlias}`,
      text: `O/A usuario/a co alias: ${usuario.usuAlias} será eliminado!`,
      icon: 'warning',
      showCancelButton: true,
      reverseButtons: true
    }).then(result => {
      if (result.value) {
        this.usuSrv.delete(usuario.usuID).subscribe(response => {
          this.usuarios = this.usuarios.filter(lib => lib !== usuario);

          swalWithBootstrapButtons.fire(`O/A usuario/a co ${usuario.usuAlias} eliminouse con exito`);

          this.usuSrv.getFilter(
            this.searchUsuNom, this.searchUsuApe1, this.searchUsuApe2,
            this.searchUsuEnder, this.searchUsuTfnoFx, this.searchUsuTfnoMb,
            // tslint:disable-next-line: no-shadowed-variable
            this.page, this.order, this.ordenationType).subscribe(response => {
              this.paginator = response;
              this.usuarios = this.paginator.content;
            }
          );

          if (this.usuarios.length === 0) {
            this.page = this.page - 1;
            this.router.navigate([this.constSrv.userCompletePagUrl + this.page]);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire();
      }
    });
  }

  refreshListRoles(listUsuRoles: Rol[]) {
    this.lstRoles = listUsuRoles;
  }

  refreshListAct(listUsuAct: Actividade[]) {
    this.lstAct = listUsuAct;
  }

  changeStatus(usuario: Usuario) {
    this.usuSrv.changeStatus(usuario);
    this.ngOnInit();
  }
}
