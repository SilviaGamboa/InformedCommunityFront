import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Incidencia } from '../../../domain/entities/incidencia.entity';
import { IncidenciaRepositoryImpl } from '../../../infrastructure/repositories/incidencia.repository.impl';

@Injectable({
  providedIn: 'root'
})
export class ObtenerTodasIncidenciasUseCase {

  constructor(
    private repository: IncidenciaRepositoryImpl
  ) {}

  execute(): Observable<Incidencia[]> {

    return this.repository.obtenerTodas();
  }
}
