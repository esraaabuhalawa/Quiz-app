import { CanActivateFn, Router } from '@angular/router';
import { RoleEnum } from '../enum/role.enum';
import { inject } from '@angular/core';
import { AuthStoreService } from '../../features/auth/services/auth-store.service';

export function roleGuard(allowedRoles: RoleEnum[]): CanActivateFn {
  return () => {
    const authStore = inject(AuthStoreService);
    const router = inject(Router);

    const userRole = authStore.userRole();

    if (userRole && allowedRoles.includes(userRole)) {
      return true;
    }

    router.navigate(['/auth/login']);
    return false;
  };
}
