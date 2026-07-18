import { Routes } from '@angular/router';

export const Auth_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./components/login/login').then((c) => c.Login),
  },
  {
    path: 'register',
    loadComponent: () => import('./components/register/register').then((c) => c.Register),
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./components/forgot-password/forgot-password').then((c) => c.ForgotPassword),
  },
  {
    path: 'reset-password',
    loadComponent: () =>
      import('./components/reset-password/reset-password').then((c) => c.ResetPassword),
  },
  {
    path: 'change-password',
    loadComponent: () =>
      import('./components/change-password/change-password').then((c) => c.ChangePassword),
  },

];
