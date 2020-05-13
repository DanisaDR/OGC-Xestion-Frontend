import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { allIcons } from 'ngx-bootstrap-icons';

import { AppComponent } from './app.component';
import { LoginService } from './services/login.service';
import { UsuarioService } from './services/usuario.service';
import { ActividadeService } from './services/actividade.service';
import { InicioService } from './services/inicio.service';
import { SweetAlertService } from './services/sweetalert.service';
import { ConstantsService } from './services/constants.service';

import { TokenInterceptor } from './interceptors/token.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { GlobalHttpInterceptor } from './interceptors/global.http.interceptor';

import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';

import { ListUsuarioComponent } from './components/usuario/list/list-usuario.component';
import { FormUsuarioComponent } from './components/usuario/form/form-usuario.component';
import { FinderUsuarioComponent } from './components/usuario/finder/finder-usuario.component';

import { ListActividadeComponent } from './components/actividade/list/list-actividade.component';
import { FinderActividadeComponent } from './components/actividade/finder/finder-actividade.component';

import { PaginatorComponent } from './components/paginator/paginator.component';
import { ListRolComponent } from './components/rol/list/list-rol.component';
import { RolService } from './services/rol.service';
import { ListSocioComponent } from './components/socio/list/list-socio.component';
import { FinderSocioComponent } from './components/socio/finder/finder-socio.component';
import { FormRolComponent } from './components/rol/form/form-rol.component';
import { FormSocioComponent } from './components/socio/form/form-socio.component';

import { MAT_DATE_LOCALE,
  MatDatepickerModule,
   MatNativeDateModule,
   MatInputModule,
   MatFormFieldModule,
   MatCardModule,
   MatExpansionModule,
   MatButtonModule
} from '@angular/material';

import { ValidatorMbUsuarioDirective } from './validators/validator-mb-usuario.directive';
import { ValidatorEmailSocioDirective } from './validators/validator-email-socio.directive';
import { ValidatorMbSocioDirective } from './validators/validator-mb-socio.directive';
import { FormActividadeComponent } from './components/actividade/form/form-actividade.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginComponent,
    ListUsuarioComponent,
    FormUsuarioComponent,
    FinderUsuarioComponent,
    PaginatorComponent,
    ListActividadeComponent,
    FinderActividadeComponent,
    FormActividadeComponent,
    ListRolComponent,
    FormRolComponent,
    ListSocioComponent,
    FinderSocioComponent,
    FormSocioComponent,
    ValidatorMbUsuarioDirective,
    ValidatorEmailSocioDirective,
    ValidatorMbSocioDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgSelectModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatExpansionModule,
    NgxBootstrapIconsModule.pick(allIcons),
    MatButtonModule
  ],
  providers: [
    InicioService,
    LoginService,
    UsuarioService,
    ActividadeService,
    RolService,
    ConstantsService,
    SweetAlertService,
    ConstantsService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: GlobalHttpInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
