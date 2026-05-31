import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { LoginDto } from '../../../domain/dtos/login.dto';

import { LoginResponseDto } from '../../../domain/dtos/login-response.dto';

import { AuthRepositoryImpl } from '../../../infrastructure/repositories/auth.repository.impl';

@Injectable({
  providedIn: 'root'
})
export class LoginUseCase {

  constructor(
    private repository: AuthRepositoryImpl
  ) {}

  execute(
    dto: LoginDto
  ): Observable<LoginResponseDto> {

    return this.repository.login(dto);
  }
}