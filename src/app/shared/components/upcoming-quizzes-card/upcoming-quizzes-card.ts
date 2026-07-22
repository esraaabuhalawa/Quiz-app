import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IQuizRespons } from '../../../features/dashboard/instructor/interfaces/shared-instructor.interfaces';
export interface QuizSummary {
  id: string;
  title: string;
  date: Date;
  time: string;
  enrolledCount: number;
  image: string;
}
@Component({
  selector: 'quiz-app-upcoming-quizzes-card',
  imports: [RouterLink, DatePipe],
  templateUrl: './upcoming-quizzes-card.html',
  styleUrl: './upcoming-quizzes-card.scss',
})
export class UpcomingQuizzesCard {
  quizzes = input.required<IQuizRespons[]>();
  imgSrc = input<string>('/images/quizImage.png');
}
