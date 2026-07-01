import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Anuncio } from '../../domain/entities/anuncio.entity';
import { CrearAnuncioDto } from '../../domain/dtos/crear-anuncio.dto';

@Injectable({
  providedIn: 'root'
})
export class AnuncioService {

  private readonly apiUrl = `${environment.apiUrl}/Anuncios`;

  constructor(private http: HttpClient) {}

  obtenerTodos(): Observable<Anuncio[]> {
    return this.http.get<Anuncio[]>(this.apiUrl);
  }

  crearAnuncio(dto: CrearAnuncioDto): Observable<any> {
    return this.http.post(this.apiUrl, dto);
  }

  eliminarAnuncio(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
