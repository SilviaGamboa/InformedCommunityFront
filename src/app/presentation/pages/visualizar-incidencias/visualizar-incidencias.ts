import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

import { ObtenerTodasIncidenciasUseCase } from '../../../application/use-cases/incidencias/obtener-todas-incidencias.usecase';
import { ObtenerIncidenciasEstadoUseCase } from '../../../application/use-cases/incidencias/obtener-incidencias-estado.usecase';
import { ObtenerIncidenciaIdUseCase } from '../../../application/use-cases/incidencias/obtener-incidencia-id.usecase';
import { TokenService } from '../../../infrastructure/services/token.service';
import { Incidencia } from '../../../domain/entities/incidencia.entity';

@Component({
  selector: 'app-visualizar-incidencias',
  standalone: true,
  imports: [CommonModule],
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

  readonly storageUrl = environment.storageUrl;

  estadosDisponibles = ['todos', 'Abierto', 'En revisión', 'Revisado', 'Archivado'];

  constructor(
    private obtenerTodasUseCase: ObtenerTodasIncidenciasUseCase,
    private obtenerPorEstadoUseCase: ObtenerIncidenciasEstadoUseCase,
    private obtenerPorIdUseCase: ObtenerIncidenciaIdUseCase,
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit(): void {
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
      }
    };

    if (this.filtroSeleccionado === 'todos') {
      this.obtenerTodasUseCase.execute().subscribe(observer);
    } else {
      this.obtenerPorEstadoUseCase.execute(this.filtroSeleccionado).subscribe(observer);
    }
  }

  cambiarFiltro(filtro: string): void {
    this.filtroSeleccionado = filtro;
    this.cargarIncidencias();
  }

  abrirDetalle(id: number): void {
    this.mostrarModalDetalle = true;
    this.cargandoDetalle = true;
    this.incidenciaDetalle = null;

    this.obtenerPorIdUseCase.execute(id).subscribe({
      next: (incidencia: Incidencia) => {
        this.incidenciaDetalle = incidencia;
        this.cargandoDetalle = false;
      },
      error: () => {
        alert('No se pudo obtener el detalle de la incidencia.');
        this.cerrarModal();
      }
    });
  }

  cerrarModal(): void {
    this.mostrarModalDetalle = false;
    this.incidenciaDetalle = null;
    this.cargandoDetalle = false;
  }

  volver(): void {
    this.router.navigate(['/admin-home']);
  }

  cerrarSesion(): void {
    this.tokenService.clear();
    this.router.navigate(['/login']);
  }

  estadoClase(estado: string): string {
    return estado
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-');
  }
}
