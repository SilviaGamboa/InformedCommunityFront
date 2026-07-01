import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrearAnuncioDto } from '../../../domain/dtos/crear-anuncio.dto';
import { AnuncioRepositoryImpl } from '../../../infrastructure/repositories/anuncio.repository.impl';

@Injectable({
  providedIn: 'root'
})
export class CrearAnuncioUseCase {

  constructor(private repository: AnuncioRepositoryImpl) {}

  execute(dto: CrearAnuncioDto): Observable<any> {
    return this.repository.crearAnuncio(dto);
  }
}
