import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TokenService } from '../../../infrastructure/services/token.service';
import { ObtenerAnunciosUseCase } from '../../../application/use-cases/anuncios/obtener-anuncios.usecase';
import { Anuncio } from '../../../domain/entities/anuncio.entity';

@Component({
  selector: 'app-anuncios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './anuncios.html',
  styleUrls: ['./anuncios.scss']
})
export class AnunciosComponent implements OnInit {

  anuncios: Anuncio[] = [];
  cargando = true;
  error = '';

  constructor(
    private obtenerAnunciosUseCase: ObtenerAnunciosUseCase,
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarAnuncios();
  }

  cargarAnuncios(): void {
    this.cargando = true;
    this.error = '';

    this.obtenerAnunciosUseCase.execute().subscribe({
      next: (data) => {
        this.anuncios = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los anuncios. Inténtalo de nuevo.';
        this.cargando = false;
      }
    });
  }

  volver(): void {
    this.router.navigate(['/home']);
  }

  cerrarSesion(): void {
    this.tokenService.clear();
    this.router.navigate(['/login']);
  }
}
