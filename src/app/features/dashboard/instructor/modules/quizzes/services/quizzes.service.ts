import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quiz } from '../interfaces/quiz';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class QuizzesService {
  private http = inject(HttpClient);

  getFirstFiveIncomming(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`quiz/incomming`);
  }

  getLastFiveCompleted(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`quiz/completed`);
  }
}
