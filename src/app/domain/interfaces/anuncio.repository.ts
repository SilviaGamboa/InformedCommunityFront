import { Observable } from 'rxjs';
import { Anuncio } from '../entities/anuncio.entity';
import { CrearAnuncioDto } from '../dtos/crear-anuncio.dto';

export abstract class AnuncioRepository {
  abstract obtenerTodos(): Observable<Anuncio[]>;
  abstract crearAnuncio(dto: CrearAnuncioDto): Observable<any>;
  abstract eliminarAnuncio(id: number): Observable<any>;
}
