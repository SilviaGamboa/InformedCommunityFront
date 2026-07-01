import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { CrearIncidenciaDto } from '../../domain/dtos/crear-incidencia.dto';
import { Incidencia } from '../../domain/entities/incidencia.entity';

@Injectable({
  providedIn: 'root'
})
export class IncidenciaService {

  private readonly apiUrl =
    `${environment.apiUrl}/Incidencias`;

  constructor(
    private http: HttpClient
  ) {}

  crearIncidencia(
    dto: CrearIncidenciaDto,
    imagen?: File
  ): Observable<any> {

    const formData = new FormData();
    formData.append('titulo', dto.titulo);
    formData.append('descripcion', dto.descripcion);
    if (imagen) {
      formData.append('imagen', imagen);
    }

    return this.http.post(this.apiUrl, formData);
  }

  obtenerPorUsuario(
    idUsuario: number
  ): Observable<Incidencia[]> {

    return this.http.get<Incidencia[]>(
      `${this.apiUrl}/usuario/${idUsuario}`
    );
  }

  obtenerTodas(): Observable<Incidencia[]> {
    return this.http.get<Incidencia[]>(this.apiUrl);
  }

  obtenerPorEstado(estado: string): Observable<Incidencia[]> {
    return this.http.get<Incidencia[]>(`${this.apiUrl}/estado/${estado}`);
  }

  obtenerPorId(id: number): Observable<Incidencia> {
    return this.http.get<Incidencia>(`${this.apiUrl}/${id}`);
  }
}
