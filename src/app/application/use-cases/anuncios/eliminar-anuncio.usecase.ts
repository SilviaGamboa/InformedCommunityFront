import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnuncioRepositoryImpl } from '../../../infrastructure/repositories/anuncio.repository.impl';

@Injectable({
  providedIn: 'root'
})
export class EliminarAnuncioUseCase {

  constructor(private repository: AnuncioRepositoryImpl) {}

  execute(id: number): Observable<any> {
    return this.repository.eliminarAnuncio(id);
  }
}
