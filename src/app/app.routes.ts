import { Routes } from '@angular/router';
import { LoginComponent } from './presentation/pages/login/login';
import { HomeComponent } from './presentation/pages/home/home';
import { IncidenciasComponent } from './presentation/pages/incidencias/incidencias';

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
  }
];
