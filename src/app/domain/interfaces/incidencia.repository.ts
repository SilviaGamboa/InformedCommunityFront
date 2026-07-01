import { Observable } from 'rxjs';
import { CrearIncidenciaDto } from '../dtos/crear-incidencia.dto';
import { ActualizarEstadoIncidenciaDto } from '../dtos/actualizar-estado-incidencia.dto';
import { Incidencia } from '../entities/incidencia.entity';
import { ComentarioIncidencia } from '../entities/comentario-incidencia.entity';

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

  abstract actualizarEstado(
    id: number,
    dto: ActualizarEstadoIncidenciaDto
  ): Observable<any>;

  abstract obtenerComentarios(
    id: number
  ): Observable<ComentarioIncidencia[]>;
}
