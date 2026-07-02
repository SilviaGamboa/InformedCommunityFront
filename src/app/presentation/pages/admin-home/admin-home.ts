import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../../infrastructure/services/token.service';
import { AlertService } from '../../../infrastructure/services/alert.service';

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
    private tokenService: TokenService,
    private alertService: AlertService
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
    this.alertService.info(
      'Próximamente',
      'La funcionalidad para cambiar el estado de las incidencias estará disponible en una próxima versión.'
    );
  }

  cerrarSesion(): void {
    this.alertService
      .confirm(
        'Cerrar sesión',
        '¿Desea cerrar la sesión actual?'
      )
      .then((confirmado) => {
        if (confirmado) {
          this.tokenService.clear();
          this.router.navigate(['/login']);
        }
      });
  }
}