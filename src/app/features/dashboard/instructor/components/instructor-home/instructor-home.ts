import { Component, inject, OnInit, signal } from '@angular/core';
import {
  StudentSummary,
  TopStudentsCard,
} from '../../../../../shared/components/top-students-card/top-students-card';
import {
  QuizSummary,
  UpcomingQuizzesCard,
} from '../../../../../shared/components/upcoming-quizzes-card/upcoming-quizzes-card';
import { InstructorService } from '../../services/instructor-service';
import { IQuizRespons } from '../../interfaces/shared-instructor.interfaces';
import { Results } from '../../../learner/components/results/results';
import { Loader } from '../../../../../shared/components/loader/loader';

@Component({
  selector: 'app-instructor-home',
  imports: [TopStudentsCard, UpcomingQuizzesCard, Results, Loader],
  templateUrl: './instructor-home.html',
  styleUrl: './instructor-home.scss',
})
export class InstructorHome implements OnInit {
  private instructorService = inject(InstructorService);
  upcomingQuizzes = signal<IQuizRespons[]>([]);
  topStudents = signal<StudentSummary[]>([]);
  isLoadingQuizzes = signal(true);
  isLoadingStudents = signal(true);

  ngOnInit(): void {
    this.loadUpcomingQuizzes();
  }
  private loadUpcomingQuizzes(): void {
    this.isLoadingQuizzes.set(true);
    this.instructorService.getTopFiveUpcomingQuizzes().subscribe({
      next: (quizzes) => {
        this.isLoadingQuizzes.set(false);
        this.upcomingQuizzes.set(quizzes);
      },
      error: (err) => {
        console.error('Failed to load upcoming quizzes', err);
        this.isLoadingQuizzes.set(false);
      },
    });
  }

  // private loadTopStudents(): void {
  //   this.instructorService
  //     .getTopStudents()
  //     .pipe(finalize(() => this.isLoadingStudents.set(false)))
  //     .subscribe({
  //       next: (students) => this.topStudents.set(students),
  //       error: (err) => console.error('Failed to load top students', err),
  //     });
  // }
}
