import { Observable } from 'rxjs';
import { CrearIncidenciaDto } from '../dtos/crear-incidencia.dto';

export abstract class IncidenciaRepository {

  abstract crearIncidencia(
    dto: CrearIncidenciaDto
  ): Observable<any>;
}