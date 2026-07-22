import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
export interface StudentSummary {
  id: string;
  name: string;
  classRank: string;
  averageScore: number;
  avatar: string;
}
@Component({
  selector: 'quiz-app-top-students-card',
  imports: [RouterLink],
  templateUrl: './top-students-card.html',
  styleUrl: './top-students-card.scss',
})
export class TopStudentsCard {
  students = input.required<StudentSummary[]>();
}
