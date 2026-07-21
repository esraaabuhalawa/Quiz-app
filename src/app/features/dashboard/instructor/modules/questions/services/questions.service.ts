import { inject, Injectable } from '@angular/core';
import { ICreateQuestionData, ICreateQuestionResponse, IDeleteQuestionResponse, IQuestion, IQuestionUpdateForm, IUpdateQuestionResponse } from '../interfaces/questions';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  private http = inject(HttpClient);

  getAllQuestions(): Observable<IQuestion[]> {
    return this.http.get<IQuestion[]>(`question`)
  }

  getQuestions(difficulty?: string,type?: string): Observable<IQuestion[]> {
    let params = new HttpParams();

    if (difficulty) {
      params = params.set('difficulty', difficulty);
    }

    if (type) {
      params = params.set('type', type);
    }

    return this.http.get<IQuestion[]>('question/search', { params });
  }

  getQuestionDetails(id: string): Observable<IQuestion> {
    return this.http.get<IQuestion>(`question/${id}`)
  }

  createQuestion(data: ICreateQuestionData): Observable<ICreateQuestionResponse> {
    return this.http.post<ICreateQuestionResponse>('question', data)
  }

  updateQuestion(id: string, data: IQuestionUpdateForm): Observable<IUpdateQuestionResponse> {
    return this.http.put<IUpdateQuestionResponse>(`question/${id}`, data)
  }

  deleteQuestion(id: string): Observable<IDeleteQuestionResponse> {
    return this.http.delete<IDeleteQuestionResponse>(`question/${id}`)
  }
}
