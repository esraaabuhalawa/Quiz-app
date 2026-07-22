import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth-guard';
import { roleGuard } from '../../core/guards/role-guard';
import { RoleEnum } from '../../core/enum/role.enum';
import { DashboardLayout } from '../../shared/layouts/dashboard-layout/dashboard-layout';
import { homeRedirectGuard } from '../../core/guards/home-redirect-guard';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardLayout,
    children: [
      {
        path: '',
        canActivate: [homeRedirectGuard],
        component: DashboardLayout,
      },
      {
        path: 'instructor',
        loadChildren: () =>
          import('./instructor/instructor.routes').then((m) => m.INSTRUCTOR_ROUTES),
        canActivate: [roleGuard([RoleEnum.Instructor])],
        data: {
          title: 'Dashboard',
        },
      },
      {
        path: 'learner',
        loadChildren: () => import('./learner/learner.routes').then((m) => m.LEARNER_ROUTES),
        canActivate: [roleGuard([RoleEnum.Student])],
      },
    ],
  },
];
