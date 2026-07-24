import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { EmptyStateComponent } from '../../../../../../../shared/components/empty-state/empty-state.component';
import { Quiz } from '../../interfaces/quiz';
import { QuizzesService } from '../../services/quizzes.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'quiz-app-quiz-list',
  imports: [
    TableModule,
    CardModule,
    ButtonModule,
    CommonModule,
    RouterLink,
    EmptyStateComponent,
    Toast,
    TranslatePipe,
  ],
  templateUrl: './quiz-list.html',
  styleUrl: './quiz-list.scss',
})
export class QuizList implements OnInit {
  private quizzesService = inject(QuizzesService);
  private messageService = inject(MessageService);
  private translateService = inject(TranslateService);

  upcomingQuizzes: Quiz[] = [];
  completedQuizzes: Quiz[] = [];

  ngOnInit(): void {
    this.getIncomingQuizzes();
    this.getCompletedQuizzes();
  }

  getIncomingQuizzes(): void {
    this.quizzesService.getIncomingQuizzes().subscribe({
      next: (res) => {
        this.upcomingQuizzes = res;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: this.translateService.instant('COMMON.ERROR'),
          detail: err?.error?.message || 'Failed to load upcoming quizzes',
        });
      },
    });
  }

  getCompletedQuizzes(): void {
    this.quizzesService.getCompletedQuizzes().subscribe({
      next: (res) => {
        this.completedQuizzes = res;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: this.translateService.instant('COMMON.ERROR'),
          detail: err?.error?.message || 'Failed to load completed quizzes',
        });
      },
    });
  }
}
