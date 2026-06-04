import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistrarUsuarioDto } from '../../../domain/dtos/registrar-usuario.dto';
import { AuthService } from '../../../infrastructure/services/auth.service';

@Injectable({ providedIn: 'root' })
export class RegistrarUsuarioUseCase {
  constructor(private authService: AuthService) {}

  execute(dto: RegistrarUsuarioDto): Observable<void> {
    return this.authService.registrar(dto);
  }
}
