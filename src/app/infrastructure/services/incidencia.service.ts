import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { CrearIncidenciaDto } from '../../domain/dtos/crear-incidencia.dto';

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
    dto: CrearIncidenciaDto
  ): Observable<any> {

    return this.http.post(
      this.apiUrl,
      dto
    );
  }
}