import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../../infrastructure/services/token.service';
import { AlertService } from '../../../infrastructure/services/alert.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent implements OnInit {

  nombreUsuario = '';

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.nombreUsuario = usuario.nombre ?? '';
  }

  irAIncidencias() {
    this.router.navigate(['/incidencias']);
  }

  irAMisIncidencias() {
    this.router.navigate(['/mis-incidencias']);
  }

  irAAnuncios() {
    this.router.navigate(['/anuncios']);
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