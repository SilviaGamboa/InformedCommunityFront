import { Observable } from 'rxjs';
import { LoginDto } from '../dtos/login.dto';
import { LoginResponseDto } from '../dtos/login-response.dto';

export abstract class AuthRepository {
  abstract login(
    dto: LoginDto
  ): Observable<LoginResponseDto>;
}