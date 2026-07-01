import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Incidencia } from '../../../domain/entities/incidencia.entity';
import { IncidenciaRepositoryImpl } from '../../../infrastructure/repositories/incidencia.repository.impl';

@Injectable({
  providedIn: 'root'
})
export class ObtenerIncidenciaIdUseCase {

  constructor(
    private repository: IncidenciaRepositoryImpl
  ) {}

  execute(id: number): Observable<Incidencia> {

    return this.repository.obtenerPorId(id);
  }
}
