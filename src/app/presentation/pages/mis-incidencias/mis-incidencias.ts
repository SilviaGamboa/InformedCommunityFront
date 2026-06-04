import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

import { ObtenerIncidenciasUsuarioUseCase }
from '../../../application/use-cases/incidencias/obtener-incidencias-usuario.usecase';
import { Incidencia } from '../../../domain/entities/incidencia.entity';

@Component({
  selector: 'app-mis-incidencias',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './mis-incidencias.html',
  styleUrls: ['./mis-incidencias.scss']
})
export class MisIncidenciasComponent implements OnInit {

  incidencias: Incidencia[] = [];
  cargando = true;
  error = '';
  readonly storageUrl = environment.storageUrl;

  constructor(
    private obtenerIncidenciasUsuarioUseCase:
      ObtenerIncidenciasUsuarioUseCase,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.cargarIncidencias();
  }

  cargarIncidencias(): void {

    const usuario = this.obtenerUsuario();

    if (!usuario?.id) {

      this.error = 'No se encontro el usuario actual.';
      this.cargando = false;
      return;
    }

    this.cargando = true;
    this.error = '';

    this.obtenerIncidenciasUsuarioUseCase
      .execute(usuario.id)
      .subscribe({

        next: incidencias => {

          this.incidencias = incidencias;
          this.cargando = false;
        },

        error: () => {

          this.error =
            'No se pudieron cargar tus incidencias.';
          this.cargando = false;
        }
      });
  }

  volver(): void {

    this.router.navigate([
      '/home'
    ]);
  }

  estadoClase(
    estado: string
  ): string {

    return estado
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-');
  }

  private obtenerUsuario(): { id: number } | null {

    const usuario = localStorage.getItem(
      'usuario'
    );

    if (!usuario) return null;

    try {

      return JSON.parse(usuario);
    } catch {

      return null;
    }
  }
}
