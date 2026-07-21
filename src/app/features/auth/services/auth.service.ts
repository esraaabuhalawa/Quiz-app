import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import {
  // IResetResponse,
  IReset,
  IChangePassword,
  IRegister,
  IRegisterResponse,
  IForgotResponse,
  ILoginRequest,
  LoginResponse,
} from '../interfaces/auth';
import { TokenService } from './token.service';
import { AuthStoreService } from './auth-store.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private readonly authStore = inject(AuthStoreService);
  private readonly tokenService = inject(TokenService);

  onLogin(data: ILoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('auth/login', data).pipe(
      tap((response) => {
        this.tokenService.saveToken(response.data.accessToken);
        this.tokenService.saveUser(response.data.profile);
        this.authStore.setUser(response.data.profile);
      }),
    );
  }

  logout(): void {
    this.tokenService.clearSession();
    this.authStore.clearUser();
  }

  onResetPass(data: IReset): Observable<any> {
    return this.http.post<any>('auth/reset-password', data);
  }

  forgotPassword(email: string): Observable<IForgotResponse> {
    return this.http.post<IForgotResponse>('auth/forgot-password', { email });
  }

  changePassword(data: IChangePassword): Observable<any> {
    return this.http.post<any>('auth/change-password', data);
  }

  register(data: IRegister): Observable<IRegisterResponse> {
    return this.http.post<IRegisterResponse>('auth/register', data);
  }
}
