import { Routes } from '@angular/router';
export const LEARNER_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/learner-home/learner-home').then((c) => c.LearnerHome),
  },
  {
    path: 'quizzes',
    loadComponent: () => import('./components/quizzes/quizzes').then((c) => c.Quizzes),
  },
  {
    path: '**',
    title: 'Page Not Found',
    loadComponent: () =>
      import('./../../../shared/components/not-found/not-found.component').then(
        (m) => m.NotFoundComponent,
      ),
  },
];
