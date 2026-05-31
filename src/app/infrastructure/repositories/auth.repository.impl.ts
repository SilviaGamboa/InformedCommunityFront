import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { LoginDto } from '../../domain/dtos/login.dto';

import { LoginResponseDto } from '../../domain/dtos/login-response.dto';

import { AuthRepository } from '../../domain/interfaces/auth.repository';
import { AuthService } from '../services/auth.service';



@Injectable({
  providedIn: 'root'
})
export class AuthRepositoryImpl
  implements AuthRepository {

  constructor(
    private authService: AuthService
  ) {}

  login(
    dto: LoginDto
  ): Observable<LoginResponseDto> {

    return this.authService.login(dto);
  }
}