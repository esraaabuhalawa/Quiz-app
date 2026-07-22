import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../../features/auth/services/token.service';
import { RoleEnum } from '../enum/role.enum';

export const homeRedirectGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  console.log("token service",tokenService.getUser()?.role);
  const role = tokenService.getUser()?.role;


  return role === RoleEnum.Instructor
    ? router.createUrlTree(['/dashboard/instructor'])
    : router.createUrlTree(['/dashboard/student']);
};
