import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnuncioRepository } from '../../domain/interfaces/anuncio.repository';
import { Anuncio } from '../../domain/entities/anuncio.entity';
import { CrearAnuncioDto } from '../../domain/dtos/crear-anuncio.dto';
import { AnuncioService } from '../services/anuncio.service';

@Injectable({
  providedIn: 'root'
})
export class AnuncioRepositoryImpl implements AnuncioRepository {

  constructor(private anuncioService: AnuncioService) {}

  obtenerTodos(): Observable<Anuncio[]> {
    return this.anuncioService.obtenerTodos();
  }

  crearAnuncio(dto: CrearAnuncioDto): Observable<any> {
    return this.anuncioService.crearAnuncio(dto);
  }

  eliminarAnuncio(id: number): Observable<any> {
    return this.anuncioService.eliminarAnuncio(id);
  }
}
