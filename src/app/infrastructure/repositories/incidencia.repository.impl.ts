import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { CrearIncidenciaDto } from '../../domain/dtos/crear-incidencia.dto';
import { ActualizarEstadoIncidenciaDto } from '../../domain/dtos/actualizar-estado-incidencia.dto';
import { Incidencia } from '../../domain/entities/incidencia.entity';
import { ComentarioIncidencia } from '../../domain/entities/comentario-incidencia.entity';
import { IncidenciaRepository } from '../../domain/interfaces/incidencia.repository';

import { IncidenciaService } from '../services/incidencia.service';

@Injectable({
  providedIn: 'root'
})
export class IncidenciaRepositoryImpl
  implements IncidenciaRepository {

  constructor(
    private incidenciaService: IncidenciaService
  ) {}

  crearIncidencia(
    dto: CrearIncidenciaDto,
    imagen?: File
  ): Observable<any> {

    return this.incidenciaService
      .crearIncidencia(dto, imagen);
  }

  obtenerPorUsuario(
    idUsuario: number
  ): Observable<Incidencia[]> {

    return this.incidenciaService
      .obtenerPorUsuario(idUsuario);
  }

  obtenerTodas(): Observable<Incidencia[]> {
    return this.incidenciaService.obtenerTodas();
  }

  obtenerPorEstado(estado: string): Observable<Incidencia[]> {
    return this.incidenciaService.obtenerPorEstado(estado);
  }

  obtenerPorId(id: number): Observable<Incidencia> {
    return this.incidenciaService.obtenerPorId(id);
  }

  actualizarEstado(
    id: number,
    dto: ActualizarEstadoIncidenciaDto
  ): Observable<any> {
    return this.incidenciaService.actualizarEstado(id, dto);
  }

  obtenerComentarios(
    id: number
  ): Observable<ComentarioIncidencia[]> {
    return this.incidenciaService.obtenerComentarios(id);
  }
}
