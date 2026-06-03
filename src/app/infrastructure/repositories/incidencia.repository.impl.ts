import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { CrearIncidenciaDto } from '../../domain/dtos/crear-incidencia.dto';
import { Incidencia } from '../../domain/entities/incidencia.entity';
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
    dto: CrearIncidenciaDto
  ): Observable<any> {

    return this.incidenciaService
      .crearIncidencia(dto);
  }

  obtenerPorUsuario(
    idUsuario: number
  ): Observable<Incidencia[]> {

    return this.incidenciaService
      .obtenerPorUsuario(idUsuario);
  }
}
