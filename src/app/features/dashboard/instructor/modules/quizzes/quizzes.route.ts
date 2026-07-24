import { Routes } from '@angular/router';
export const QUIZZES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/quiz-list/quiz-list').then((c) => c.QuizList),
    data: {
      title: 'Quizzez',
    },
  },
  {
    path: 'view-quiz/:id',
    loadComponent: () =>
      import('./components/view-quiz/view-quiz').then(
        (c) => c.ViewQuiz,
      ),
    data: {
      title: 'view-quiz',
    },
  },
  {
    path: 'add-quiz',
    loadComponent: () =>
      import('./components/add-edit-quiz/add-edit-quiz').then(
        (c) => c.AddEditQuiz,
      ),
    data: {
      title: 'Add-quiz',
    },
  },
];
