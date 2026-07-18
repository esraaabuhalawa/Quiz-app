import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {
  IResetResponse,
  IReset,
  IForgotResponse,
  ILoginRequest,
  LoginResponse,
} from '../interfaces/auth';
import { ApiResponse } from '../../../core/interfaces/api-response.model';
import { TokenService } from './token.service';
import { AuthStoreService } from './auth-store.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private readonly authStore = inject(AuthStoreService);
  private readonly tokenService = inject(TokenService);
  //private router = inject(Router);
  // private currentUserSubject = new BehaviorSubject<ICurrentUser | null>(null);
  // currentUser$ = this.currentUserSubject.asObservable();

  // onLogin(data: ILogin): Observable<ILoginResponse> {
  //   return this.http.post<ILoginResponse>('portal/users/Login', data)
  // }

  // getProfile() {
  //   let token = localStorage.getItem('HMSToken');
  //   if (token) {
  //     let userDecode = jwtDecode<IDecodedToken>(token);
  //     localStorage.setItem('role', userDecode.role);
  //   }
  // }

  // updateCurrentUserData(data: FormData): Observable<any> {
  //   return this.http.put<any>('Users', data);
  // }

  // getCurrentUserId(): string | null {
  //   const token = localStorage.getItem('HMSToken');
  //   if (!token) return null;

  //   try {
  //     const decoded = jwtDecode<IDecodedToken>(token);
  //     return decoded._id;
  //   } catch {
  //     return null;
  //   }
  // }
  // //====== get logged person Data ======
  // getCurrentUserProfile(id: string): Observable<ICurrentUserResponse> {
  //   return this.http.get<ICurrentUserResponse>(`portal/users/${id}`);
  // }

  // loadCurrentUser(): void {
  //   const token = localStorage.getItem('HMSToken');
  //   if (!token) return;

  //   const decoded = jwtDecode<IDecodedToken>(token);
  //   localStorage.setItem('role', decoded.role);

  //   this.getCurrentUserProfile(decoded._id).subscribe({
  //     next: (res: ICurrentUserResponse) => {
  //       this.currentUserSubject.next(res.data.user);
  //     },
  //     error: () => {
  //       this.currentUserSubject.next(null);
  //     },
  //   });
  // }

  // getRole(): string | null {
  //   return localStorage.getItem('role') || null;
  // }

  // isLoggedIn(): boolean {
  //   return !!localStorage.getItem('HMSToken');
  // }
  // getUserName(): string | null {
  //   return this.currentUserSubject.value?.userName || null;
  // }

  // getUserImage(): string | null {
  //   return this.currentUserSubject.value?.profileImage || null;
  // }
  // logout() {
  //   localStorage.removeItem('HMSToken');
  //   localStorage.removeItem('role');
  //   this.currentUserSubject.next(null);
  //   this.router.navigate(['/']);
  // }
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
  onResetPass(data: IReset): Observable<IResetResponse> {
    return this.http.post<IResetResponse>('auth/reset-password', data);
  }

  forgotPassword(email: string): Observable<IForgotResponse> {
    return this.http.post<IForgotResponse>('auth/forgot-password', { email });
  }

  // changePassword(data: IChangePassword): Observable<IChangePasswordResponse> {
  //   return this.http.post<IChangePasswordResponse>('portal/users/change-password', data);
  // }

  // register(data: FormData): Observable<ICurrentUserResponse> {
  //   return this.http.post<ICurrentUserResponse>('admin/users', data);
  // }
}
