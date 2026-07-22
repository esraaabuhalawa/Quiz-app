import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IStudents } from '../modules/students/interfaces/students';
import { IQuizRespons } from '../interfaces/shared-instructor.interfaces';

@Injectable({
  providedIn: 'root',
})
export class InstructorService {
  private http = inject(HttpClient);
  getAllStudents(): Observable<IStudents[]> {
    return this.http.get<IStudents[]>(`student`);
  }
  // quiz/incomming
  getTopFiveUpcomingQuizzes(): Observable<IQuizRespons[]> {
    return this.http.get<IQuizRespons[]>(`quiz/incomming`);
  }
}
