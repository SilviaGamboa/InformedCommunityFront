import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ComentarioIncidencia } from '../../../domain/entities/comentario-incidencia.entity';
import { IncidenciaRepositoryImpl } from '../../../infrastructure/repositories/incidencia.repository.impl';

@Injectable({
  providedIn: 'root'
})
export class ObtenerComentariosIncidenciaUseCase {

  constructor(
    private repository: IncidenciaRepositoryImpl
  ) {}

  execute(id: number): Observable<ComentarioIncidencia[]> {
    return this.repository.obtenerComentarios(id);
  }
}
