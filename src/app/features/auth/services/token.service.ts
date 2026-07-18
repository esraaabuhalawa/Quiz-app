import { Injectable } from '@angular/core';
import { UserProfile } from '../interfaces/auth';
const TOKEN_KEY = 'access_token';
const USER_KEY = 'user_profile';
@Injectable({
  providedIn: 'root',
})
export class TokenService {
  saveToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  saveUser(user: UserProfile): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  getUser(): UserProfile | null {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as UserProfile) : null;
  }

  clearSession(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
}
