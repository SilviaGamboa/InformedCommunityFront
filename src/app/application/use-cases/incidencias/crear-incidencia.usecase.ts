import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { CrearIncidenciaDto } from '../../../domain/dtos/crear-incidencia.dto';

import { IncidenciaRepositoryImpl }
from '../../../infrastructure/repositories/incidencia.repository.impl';

@Injectable({
  providedIn: 'root'
})
export class CrearIncidenciaUseCase {

  constructor(
    private repository:
      IncidenciaRepositoryImpl
  ) {}

  execute(
    dto: CrearIncidenciaDto,
    imagen?: File
  ): Observable<any> {

    return this.repository
      .crearIncidencia(dto, imagen);
  }
}