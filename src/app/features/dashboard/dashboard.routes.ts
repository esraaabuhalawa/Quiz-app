import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth-guard';
import { roleGuard } from '../../core/guards/role-guard';
import { RoleEnum } from '../../core/enum/role.enum';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: 'instructor',
    canActivate: [authGuard, roleGuard([RoleEnum.Instructor])],
    loadChildren: () => import('./instructor/instructor.routes').then((r) => r.INSTRUCTOR_ROUTES),
  },
  {
    path: 'learner',
    canActivate: [authGuard, roleGuard([RoleEnum.Student])],
    loadChildren: () => import('./learner/learner.routes').then((m) => m.LEARNER_ROUTES),
  },
];
