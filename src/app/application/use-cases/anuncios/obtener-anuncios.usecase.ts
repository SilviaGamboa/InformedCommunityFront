import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Anuncio } from '../../../domain/entities/anuncio.entity';
import { AnuncioRepositoryImpl } from '../../../infrastructure/repositories/anuncio.repository.impl';

@Injectable({
  providedIn: 'root'
})
export class ObtenerAnunciosUseCase {

  constructor(private repository: AnuncioRepositoryImpl) {}

  execute(): Observable<Anuncio[]> {
    return this.repository.obtenerTodos();
  }
}
