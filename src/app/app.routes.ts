import { Routes } from '@angular/router';
import { LoginComponent } from './presentation/pages/login/login';
import { HomeComponent } from './presentation/pages/home/home';
import { IncidenciasComponent } from './presentation/pages/incidencias/incidencias';
import { MisIncidenciasComponent } from './presentation/pages/mis-incidencias/mis-incidencias';
import { AdminHomeComponent } from './presentation/pages/admin-home/admin-home';
import { RegistroUsuariosComponent } from './presentation/pages/registro-usuarios/registro-usuarios';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'incidencias',
    component: IncidenciasComponent
  },
  {
    path: 'mis-incidencias',
    component: MisIncidenciasComponent
  },
  {
    path: 'admin-home',
    component: AdminHomeComponent
  },
  {
    path: 'registro-usuarios',
    component: RegistroUsuariosComponent
  }
];
