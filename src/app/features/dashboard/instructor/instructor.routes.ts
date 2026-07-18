import { Routes } from '@angular/router';
export const INSTRUCTOR_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/instructor-home/instructor-home').then((c) => c.InstructorHome),
  },
  {
    path: 'groups',
    loadComponent: () => import('./components/groups/groups').then((c) => c.Groups),
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
