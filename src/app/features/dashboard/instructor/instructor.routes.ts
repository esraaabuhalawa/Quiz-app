import { Routes } from '@angular/router';
export const INSTRUCTOR_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/instructor-home/instructor-home').then((c) => c.InstructorHome),
  },
  {
    path: 'groups',
    loadComponent: () =>
      import('../instructor/modules/group/components/groups-list/groups-list').then(
        (c) => c.GroupsList,
      ),
    data: {
      title: 'Groups',
    },
  },
  {
    path: 'students',
    loadComponent: () =>
      import('../instructor/modules/students/components/student-list/student-list').then(
        (c) => c.StudentList,
      ),
    data: {
      title: 'Students',
    },
  },
  {
    path: 'quizzes',
    loadComponent: () =>
      import('../instructor/modules/quizzes/components/quiz-list/quiz-list').then(
        (c) => c.QuizList,
      ),
    data: {
      title: 'Quizzes',
    },
  },
  {
    path: 'view-quiz/:id',
    loadComponent: () =>
      import('../instructor/modules/quizzes/components/view-quiz/view-quiz').then(
        (c) => c.ViewQuiz,
      ),
    data: {
      title: 'view-quiz',
    },
  },
  {
    path: 'add-quiz',
    loadComponent: () =>
      import('../instructor/modules/quizzes/components/add-edit-quiz/add-edit-quiz').then(
        (c) => c.AddEditQuiz,
      ),
    data: {
      title: 'Add-quiz',
    },
  },
  {
    path: 'questions',
    loadComponent: () =>
      import('../instructor/modules/questions/components/questions-list/questions-list').then(
        (c) => c.QuestionsList,
      ),
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
