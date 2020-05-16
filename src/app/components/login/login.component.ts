import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/models/login';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { ConstantsService } from 'src/app/services/constants.service';
import { SweetAlertService } from 'src/app/services/sweetalert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: Login = new Login();
  attempts: number;

  show: boolean;
  visible = false;

  constructor(
    private loginSrv: LoginService,
    private router: Router,
    private constSrv: ConstantsService,
    private sweetSrv: SweetAlertService
  ) {
    this.show = false;
  }

  ngOnInit() {
    if (this.loginSrv.isAuthenticated()) {
      this.router.navigate([this.constSrv.homeUrl]);
    }
  }

  contrasinal() {
    this.show = !this.show;
    this.visible = !this.visible;
  }

  logon(): void {
    this.loginSrv.logon(this.login).subscribe(
      response => {
        this.loginSrv.saveToken(response.access_token);
        this.loginSrv.saveUser(response.access_token);
        this.router.navigate([this.constSrv.homeUrl]);
      }, err => {
        if (err.status === 401) {
          this.sweetSrv.error401();
          return;
        } else if (err.status === 400) {
          this.loginSrv.attempLogin(this.login.usuAlias).subscribe(int => {
              this.attempts = int;
            }
          );
          this.sweetSrv.error400();
        }

        if (this.attempts === 0) {
          this.sweetSrv.accountBlock(this.login.usuAlias);
        }
      }
    );
  }
}
