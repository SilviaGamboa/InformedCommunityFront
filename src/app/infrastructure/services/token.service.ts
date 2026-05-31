import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  save(token: string): void {
    localStorage.setItem(
      'token',
      token
    );
  }

  get(): string | null {
    return localStorage.getItem(
      'token'
    );
  }

  clear(): void {
    localStorage.clear();
  }

  isLogged(): boolean {
    return !!this.get();
  }
}