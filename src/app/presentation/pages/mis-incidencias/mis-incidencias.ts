import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

import { ObtenerIncidenciasUsuarioUseCase }
from '../../../application/use-cases/incidencias/obtener-incidencias-usuario.usecase';
import { ObtenerComentariosIncidenciaUseCase } from '../../../application/use-cases/incidencias/obtener-comentarios-incidencia.usecase';
import { Incidencia } from '../../../domain/entities/incidencia.entity';
import { ComentarioIncidencia } from '../../../domain/entities/comentario-incidencia.entity';

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

  incidenciaDetalle: Incidencia | null = null;
  mostrarModalDetalle = false;
  comentarios: ComentarioIncidencia[] = [];
  cargandoComentarios = false;
  comentariosError = '';

  constructor(
    private obtenerIncidenciasUsuarioUseCase:
      ObtenerIncidenciasUsuarioUseCase,
    private obtenerComentariosIncidenciaUseCase:
      ObtenerComentariosIncidenciaUseCase,
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
          this.error = 'No se pudieron cargar tus incidencias.';
          this.cargando = false;
        }
      });
  }

  abrirDetalle(incidencia: Incidencia): void {
    this.incidenciaDetalle = incidencia;
    this.mostrarModalDetalle = true;
    this.cargarComentarios(incidencia.id);
  }

  cerrarModal(): void {
    this.mostrarModalDetalle = false;
    this.incidenciaDetalle = null;
    this.comentarios = [];
    this.comentariosError = '';
  }

  private cargarComentarios(id: number): void {
    this.cargandoComentarios = true;
    this.comentariosError = '';

    this.obtenerComentariosIncidenciaUseCase.execute(id).subscribe({
      next: comentarios => {
        this.comentarios = comentarios;
        this.cargandoComentarios = false;
      },
      error: () => {
        this.comentariosError = 'No se pudieron cargar los comentarios de esta incidencia.';
        this.cargandoComentarios = false;
      }
    });
  }

  volver(): void {
    this.router.navigate(['/home']);
  }

  estadoClase(estado: string): string {
    return estado
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-');
  }

  trackByComentarioId(_index: number, comentario: ComentarioIncidencia): number {
    return comentario.id;
  }

  private obtenerUsuario(): { id: number } | null {
    const usuario = localStorage.getItem('usuario');
    if (!usuario) return null;

    try {
      return JSON.parse(usuario);
    } catch {
      return null;
    }
  }
}
