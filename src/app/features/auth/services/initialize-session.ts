// core/auth/session-initializer.ts
import { inject } from '@angular/core';
import { AuthStoreService } from './auth-store.service';
import { TokenService } from './token.service';

export function initializeSession(): void {
  const authStore = inject(AuthStoreService);
  const tokenService = inject(TokenService);

  const token = tokenService.getToken();
  const user = tokenService.getUser();

  if (token && user) {
    authStore.setUser(user);
  }
}
