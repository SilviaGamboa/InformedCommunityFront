import { Routes } from '@angular/router';
import { LoginComponent } from './presentation/pages/login/login';
import { HomeComponent } from './presentation/pages/home/home';


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
  }
];
