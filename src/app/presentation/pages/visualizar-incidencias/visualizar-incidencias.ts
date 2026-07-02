import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

import { ObtenerTodasIncidenciasUseCase } from '../../../application/use-cases/incidencias/obtener-todas-incidencias.usecase';
import { ObtenerIncidenciasEstadoUseCase } from '../../../application/use-cases/incidencias/obtener-incidencias-estado.usecase';
import { ObtenerIncidenciaIdUseCase } from '../../../application/use-cases/incidencias/obtener-incidencia-id.usecase';
import { ObtenerComentariosIncidenciaUseCase } from '../../../application/use-cases/incidencias/obtener-comentarios-incidencia.usecase';
import { ActualizarEstadoIncidenciaUseCase } from '../../../application/use-cases/incidencias/actualizar-estado-incidencia.usecase';

import { TokenService } from '../../../infrastructure/services/token.service';
import { AlertService } from '../../../infrastructure/services/alert.service';

import { Incidencia } from '../../../domain/entities/incidencia.entity';
import { ComentarioIncidencia } from '../../../domain/entities/comentario-incidencia.entity';
import { ActualizarEstadoIncidenciaDto } from '../../../domain/dtos/actualizar-estado-incidencia.dto';

@Component({
  selector: 'app-visualizar-incidencias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './visualizar-incidencias.html',
  styleUrls: ['./visualizar-incidencias.scss']
})
export class VisualizarIncidenciasComponent implements OnInit {

  incidencias: Incidencia[] = [];
  cargando = true;
  error = '';
  filtroSeleccionado = 'todos';

  incidenciaDetalle: Incidencia | null = null;
  cargandoDetalle = false;
  mostrarModalDetalle = false;

  comentarios: ComentarioIncidencia[] = [];
  cargandoComentarios = false;
  comentariosError = '';

  esAdmin = false;
  estadoSeleccionado = '';
  nuevoComentario = '';
  validacionEstado = '';
  validacionComentario = '';
  mensajeErrorModal = '';
  mensajeExito = '';
  cargandoActualizacion = false;

  readonly storageUrl = environment.storageUrl;

  estadosDisponibles = [
    'todos',
    'Abierto',
    'En revisión',
    'Revisado',
    'Archivado'
  ];

  estadosPermitidos = [
    'Abierto',
    'En revisión',
    'Revisado',
    'Archivado'
  ];

  constructor(
    private obtenerTodasUseCase: ObtenerTodasIncidenciasUseCase,
    private obtenerPorEstadoUseCase: ObtenerIncidenciasEstadoUseCase,
    private obtenerPorIdUseCase: ObtenerIncidenciaIdUseCase,
    private obtenerComentariosIncidenciaUseCase: ObtenerComentariosIncidenciaUseCase,
    private actualizarEstadoIncidenciaUseCase: ActualizarEstadoIncidenciaUseCase,
    private tokenService: TokenService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.esAdmin = this.verificarAdmin();
    this.cargarIncidencias();
  }

  cargarIncidencias(): void {
    this.cargando = true;
    this.error = '';

    const observer = {
      next: (data: Incidencia[]) => {
        this.incidencias = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar las incidencias.';
        this.cargando = false;

        this.alertService.error(
          'Error al cargar incidencias',
          'No fue posible obtener la lista de incidencias.'
        );
      }
    };

    if (this.filtroSeleccionado === 'todos') {
      this.obtenerTodasUseCase.execute().subscribe(observer);
    } else {
      this.obtenerPorEstadoUseCase
        .execute(this.filtroSeleccionado)
        .subscribe(observer);
    }
  }

  cambiarFiltro(filtro: string): void {
    this.filtroSeleccionado = filtro;
    this.cargarIncidencias();
  }

  abrirDetalle(id: number): void {
    this.mostrarModalDetalle = true;
    this.cargandoDetalle = true;
    this.comentarios = [];
    this.comentariosError = '';
    this.mensajeErrorModal = '';
    this.mensajeExito = '';
    this.validacionComentario = '';
    this.validacionEstado = '';
    this.estadoSeleccionado = '';
    this.nuevoComentario = '';

    this.obtenerPorIdUseCase.execute(id).subscribe({
      next: (incidencia: Incidencia) => {
        console.log(incidencia);
        this.incidenciaDetalle = incidencia;
        this.estadoSeleccionado = incidencia.estado;
        this.cargandoDetalle = false;
        this.cargarComentarios(incidencia.id);
      },
      error: () => {
        this.alertService.error(
          'Error',
          'No se pudo obtener el detalle de la incidencia.'
        );

        this.cerrarModal();
      }
    });
  }

  private cargarComentarios(id: number): void {
    this.cargandoComentarios = true;
    this.comentariosError = '';

    this.obtenerComentariosIncidenciaUseCase.execute(id).subscribe({
      next: (comentarios: ComentarioIncidencia[]) => {
        this.comentarios = comentarios;
        this.cargandoComentarios = false;
      },
      error: () => {
        this.comentariosError =
          'No se pudieron cargar los comentarios de esta incidencia.';
        this.cargandoComentarios = false;
      }
    });
  }

  guardarCambioEstado(): void {

    this.limpiarValidaciones();

    if (!this.incidenciaDetalle) {
      return;
    }

    const estadoValido = this.estadosPermitidos.includes(this.estadoSeleccionado);
    const comentarioTrim = this.nuevoComentario.trim();

    if (!estadoValido) {
      this.validacionEstado = 'Selecciona un estado válido.';
    }

    if (!comentarioTrim) {
      this.validacionComentario = 'El comentario es obligatorio.';
    }

    if (!estadoValido || !comentarioTrim) {
      return;
    }

    this.cargandoActualizacion = true;
    this.mensajeErrorModal = '';
    this.mensajeExito = '';

    const incidenciaId = this.incidenciaDetalle.id;

    const dto: ActualizarEstadoIncidenciaDto = {
      estado: this.estadoSeleccionado,
      comentario: comentarioTrim
    };

    this.actualizarEstadoIncidenciaUseCase
      .execute(incidenciaId, dto)
      .subscribe({
        next: () => {

          if (this.incidenciaDetalle) {
            this.incidenciaDetalle.estado = this.estadoSeleccionado;
          }

          this.mensajeExito = 'Estado actualizado correctamente.';
          this.nuevoComentario = '';

          this.cargarComentarios(incidenciaId);
          this.cargarIncidencias();

          this.cargandoActualizacion = false;
        },
        error: (error: HttpErrorResponse) => {
          this.mensajeErrorModal = this.mapearError(error);
          this.cargandoActualizacion = false;
        }
      });
  }

  cerrarModal(): void {
    this.mostrarModalDetalle = false;
    this.incidenciaDetalle = null;
    this.cargandoDetalle = false;
    this.comentarios = [];
  }

  volver(): void {
    this.router.navigate(['/admin-home']);
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

  estadoClase(estado: string): string {
    return estado
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-');
  }

  private verificarAdmin(): boolean {
    const usuario = this.obtenerUsuario();
    const rol = usuario?.rol?.toString().toLowerCase();
    return rol === 'admin' || rol === 'administrador';
  }

  private obtenerUsuario(): { rol?: string } | null {
    const usuario = localStorage.getItem('usuario');

    if (!usuario) {
      return null;
    }

    try {
      return JSON.parse(usuario);
    } catch {
      return null;
    }
  }

  private limpiarValidaciones(): void {
    this.validacionEstado = '';
    this.validacionComentario = '';
    this.mensajeErrorModal = '';
    this.mensajeExito = '';
  }

  private mapearError(error: HttpErrorResponse): string {

    if (error.status === 400) {
      return 'Datos inválidos. Verifica estado y comentario.';
    }

    if (error.status === 401) {
      return 'Debes iniciar sesión para realizar esta acción.';
    }

    if (error.status === 403) {
      return 'No tienes permisos para cambiar el estado.';
    }

    if (error.status === 404) {
      return 'No se encontró la incidencia.';
    }

    return 'Error del servidor. Intenta nuevamente más tarde.';
  }

}