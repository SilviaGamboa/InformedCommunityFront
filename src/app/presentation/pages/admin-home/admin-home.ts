import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../../infrastructure/services/token.service';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  templateUrl: './admin-home.html',
  styleUrls: ['./admin-home.scss']
})
export class AdminHomeComponent {
  menuActual: 'principal' | 'incidencias' = 'principal';

  constructor(
    private router: Router,
    private tokenService: TokenService
  ) {}

  irARegistroUsuarios() {
    this.router.navigate(['/registro-usuarios']);
  }

  irAPublicarAnuncios() {
    this.router.navigate(['/publicar-anuncios']);
  }

  mostrarMenuIncidencias() {
    this.router.navigate(['/visualizar-incidencias']);
  }

  mostrarMenuPrincipal() {
    this.menuActual = 'principal';
  }

  visualizarIncidencias() {
    this.router.navigate(['/visualizar-incidencias']);
  }

  cambiarEstadoIncidencias() {
    alert('Cambio de Estado de Incidencias: Esta funcionalidad se implementará próximamente.');
  }

  cerrarSesion() {
    this.tokenService.clear();
    this.router.navigate(['/login']);
  }
}
