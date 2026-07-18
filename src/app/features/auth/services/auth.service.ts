import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  IResetResponse,
  IReset,
  IChangePassword,
  IRegister,
  IRegisterResponse,
  IForgotResponse,
  ILogin,
  ILoginResponse,
} from '../interfaces/auth';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  //private router = inject(Router);
  // private currentUserSubject = new BehaviorSubject<ICurrentUser | null>(null);
  // currentUser$ = this.currentUserSubject.asObservable();

  onLogin(data: ILogin): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>('portal/users/Login', data);
  }

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

  onResetPass(data: IReset): Observable<IResetResponse> {
    return this.http.post<IResetResponse>('auth/reset-password', data);
  }

  forgotPassword(email: string): Observable<IForgotResponse> {
    return this.http.post<IForgotResponse>('auth/forgot-password', { email });
  }

   changePassword(data: IChangePassword): Observable<IResetResponse> {
     return this.http.post<IResetResponse>('auth/change-password', data);
   }

  register(data: IRegister): Observable<IRegisterResponse> {
    return this.http.post<IRegisterResponse>('auth/register', data);
  }
}
