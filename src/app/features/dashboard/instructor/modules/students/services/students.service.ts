import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IStudents } from '../interfaces/students';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private http = inject(HttpClient);

  getAllStudents():Observable<IStudents[]>{
    return this.http.get<IStudents[]>(`student`)
  }
}
