import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../../infrastructure/services/token.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent {

  constructor(
    private router: Router,
    private tokenService: TokenService
  ) {}

  irAIncidencias() {

    this.router.navigate([
      '/incidencias'
    ]);
  }

  irAMisIncidencias() {

    this.router.navigate([
      '/mis-incidencias'
    ]);
  }

  cerrarSesion() {
    this.tokenService.clear();
    this.router.navigate(['/login']);
  }
}
