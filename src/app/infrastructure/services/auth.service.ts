import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { LoginDto } from '../../domain/dtos/login.dto';

import { LoginResponseDto } from '../../domain/dtos/login-response.dto';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl =
    `${environment.apiUrl}/Auth`;

  constructor(
    private http: HttpClient
  ) {}

  login(
    dto: LoginDto
  ): Observable<LoginResponseDto> {

    return this.http.post<LoginResponseDto>(
      `${this.apiUrl}/login`,
      dto
    );
  }
}