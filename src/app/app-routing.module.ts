import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { ListUsuarioComponent } from './components/usuario/list/list-usuario.component';
import { FormUsuarioComponent } from './components/usuario/form/form-usuario.component';
import { ListActividadeComponent } from './components/actividade/list/list-actividade.component';
import { PermisoGuard } from './guards/permiso.guard';
import { ListRolComponent } from './components/rol/list/list-rol.component';
import { ListSocioComponent } from './components/socio/list/list-socio.component';
import { FormRolComponent } from './components/rol/form/form-rol.component';
import { FormSocioComponent } from './components/socio/form/form-socio.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'inicio',
    component: InicioComponent
  },
  {
    path: 'usuarios',
    component: ListUsuarioComponent,
    canActivate: [AuthGuard, PermisoGuard],
    data: { permisos: ['TODOS_PERMISOS', 'VER_USUARIOS'] }
  },
  {
    path: 'usuarios/paxina',
    component: ListUsuarioComponent,
    canActivate: [AuthGuard, PermisoGuard],
    data: { permisos: ['TODOS_PERMISOS', 'VER_USUARIOS'] }
  },
  {
    path: 'usuarios/paxina/:paxina',
    component: ListUsuarioComponent,
    canActivate: [AuthGuard, PermisoGuard],
    data: { permisos: ['TODOS_PERMISOS', 'VER_USUARIOS'] }
  },
  {
    path: 'usuarios/paxina/:paxina/atopar',
    component: ListUsuarioComponent,
    canActivate: [AuthGuard, PermisoGuard],
    data: { permisos: ['TODOS_PERMISOS', 'VER_USUARIOS'] }
  },
  {
    path: 'usuarios/form',
    component: FormUsuarioComponent,
    canActivate: [AuthGuard, PermisoGuard],
    data: { permisos: ['TODOS_PERMISOS'] }
  },
  {
    path: 'usuarios/form/:usuID',
    component: FormUsuarioComponent,
    canActivate: [AuthGuard, PermisoGuard],
    data: { permisos: ['TODOS_PERMISOS'] }
  },
  {
    path: 'usuarios/cambiar-estado',
    component: ListUsuarioComponent,
    canActivate: [AuthGuard, PermisoGuard],
    data: { permisos: ['TODOS_PERMISOS'] }
  },
  {
    path: 'actividades',
    component: ListActividadeComponent,
    canActivate: [AuthGuard, PermisoGuard],
    data: { permisos: ['TODOS_PERMISOS', 'VER_USUARIOS'] }
  },
  {
    path: 'actividades/paxina',
    component: ListActividadeComponent,
    canActivate: [AuthGuard, PermisoGuard],
    data: { permisos: ['TODOS_PERMISOS', 'VER_USUARIOS'] }
  },
  {
    path: 'actividades/paxina/:paxina',
    component: ListActividadeComponent,
    canActivate: [AuthGuard, PermisoGuard],
    data: { permisos: ['TODOS_PERMISOS', 'VER_USUARIOS'] }
  },
  {
    path: 'actividades/paxina/:paxina/atopar',
    component: ListActividadeComponent,
    canActivate: [AuthGuard, PermisoGuard],
    data: { permisos: ['TODOS_PERMISOS', 'VER_USUARIOS'] }
  },
  {
    path: 'roles',
    component: ListRolComponent,
    canActivate: [AuthGuard, PermisoGuard],
    data: { permisos: ['TODOS_PERMISOS'] }
  },
  {
    path: 'roles/listado',
    component: ListRolComponent,
    canActivate: [AuthGuard, PermisoGuard],
    data: { permisos: ['TODOS_PERMISOS'] }
  },
  {
    path: 'roles/form/:rolID',
    component: FormRolComponent,
    canActivate: [AuthGuard, PermisoGuard],
    data: { permisos: ['TODOS_PERMISOS'] }
  },
  {
    path: 'socios',
    component: ListSocioComponent,
    canActivate: [AuthGuard, PermisoGuard],
    data: { permisos: ['TODOS_PERMISOS', 'VER_USUARIOS'] }
  },
  {
    path: 'socios/paxina',
    component: ListSocioComponent,
    canActivate: [AuthGuard, PermisoGuard],
    data: { permisos: ['TODOS_PERMISOS', 'VER_USUARIOS'] }
  },
  {
    path: 'socios/paxina/:paxina',
    component: ListSocioComponent,
    canActivate: [AuthGuard, PermisoGuard],
    data: { permisos: ['TODOS_PERMISOS', 'VER_USUARIOS'] }
  },
  {
    path: 'socios/paxina/:paxina/atopar',
    component: ListSocioComponent,
    canActivate: [AuthGuard, PermisoGuard],
    data: { permisos: ['TODOS_PERMISOS', 'VER_USUARIOS'] }
  },
  {
    path: 'socios/form',
    component: FormSocioComponent,
    canActivate: [AuthGuard, PermisoGuard],
    data: { permisos: ['TODOS_PERMISOS'] }
  },
  {
    path: 'socios/form/:socID',
    component: FormSocioComponent,
    canActivate: [AuthGuard, PermisoGuard],
    data: { permisos: ['TODOS_PERMISOS'] }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
