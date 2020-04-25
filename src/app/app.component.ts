import { Component, ChangeDetectorRef } from '@angular/core';
import { LoginService } from './services/login.service';
import { ConstantsService } from './services/constants.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OGC-Xestion-Frontend';
  public autor: any = { desarrollo: 'Daniel Isasi Piñeiro' };

  constructor(
    private loginSrv: LoginService,
    private router: Router,
    private constSrv: ConstantsService,
    private changeDetector: ChangeDetectorRef) {

  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit() {
    this.changeDetector.detectChanges();
  }

  logout(): void {
    this.loginSrv.logout();
    this.router.navigate([this.constSrv.loginUrl]);
  }
}
