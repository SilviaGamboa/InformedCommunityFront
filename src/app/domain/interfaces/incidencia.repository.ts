import { Observable } from 'rxjs';
import { CrearIncidenciaDto } from '../dtos/crear-incidencia.dto';
import { Incidencia } from '../entities/incidencia.entity';

export abstract class IncidenciaRepository {

  abstract crearIncidencia(
    dto: CrearIncidenciaDto,
    imagen?: File
  ): Observable<any>;

  abstract obtenerPorUsuario(
    idUsuario: number
  ): Observable<Incidencia[]>;

  abstract obtenerTodas(): Observable<Incidencia[]>;

  abstract obtenerPorEstado(estado: string): Observable<Incidencia[]>;

  abstract obtenerPorId(id: number): Observable<Incidencia>;
}
