import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ActualizarEstadoIncidenciaDto } from '../../../domain/dtos/actualizar-estado-incidencia.dto';
import { IncidenciaRepositoryImpl } from '../../../infrastructure/repositories/incidencia.repository.impl';

@Injectable({
  providedIn: 'root'
})
export class ActualizarEstadoIncidenciaUseCase {

  constructor(
    private repository: IncidenciaRepositoryImpl
  ) {}

  execute(
    id: number,
    dto: ActualizarEstadoIncidenciaDto
  ): Observable<any> {
    return this.repository.actualizarEstado(id, dto);
  }
}
