import { computed, Injectable, signal } from '@angular/core';
import { UserProfile } from '../interfaces/auth';
import { RoleEnum } from '../../../core/enum/role.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthStoreService {
  private readonly _currentUser = signal<UserProfile | null>(null);
  readonly currentUser = this._currentUser.asReadonly();
  readonly isAuthenticated = computed(() => !!this._currentUser());

  readonly userRole = computed<RoleEnum | null>(() => this._currentUser()?.role ?? null);

  setUser(user: UserProfile): void {
    this._currentUser.set(user);
  }
  clearUser(): void {
    this._currentUser.set(null);
  }
}
