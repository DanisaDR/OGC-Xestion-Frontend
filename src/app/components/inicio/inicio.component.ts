import {Component, OnInit} from '@angular/core';
import {Login} from 'src/app/models/login';
import {Usuario} from 'src/app/models/usuario';
import {LoginService} from 'src/app/services/login.service';
import {UsuarioService} from 'src/app/services/usuario.service';
import {InicioService} from 'src/app/services/inicio.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  usuario: Usuario = new Usuario();
  blogue: any = [];

  constructor(
    private loginSrv: LoginService,
    private inicioSrv: InicioService,
    private usuSrv: UsuarioService,
  ) {}

  ngOnInit(): void {
    this.paginaInicial();
  }

  paginaInicial() {
    this.inicioSrv.getInicio();

    if (this.loginSrv.isAuthenticated()) {
      this.usuSrv.getUsu(this.loginSrv.login.usuID).subscribe((usuario) => {
        this.usuario = usuario;
      });
    }

    this.inicioSrv.getRRSSRedeoza().subscribe((blg) => {
      this.blogue = blg;
    });
  }
}
