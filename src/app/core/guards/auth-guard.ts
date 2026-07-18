import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStoreService } from '../../features/auth/services/auth-store.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authStore = inject(AuthStoreService);
  const router = inject(Router);
  if (authStore.isAuthenticated()) {
    return true;
  }

  router.navigate(['/auth/login']);
  return false;
};
