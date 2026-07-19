import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICreateResponse, IDeleteResponse, IGroupFormData, IUpdateResponse, IGroupData, IGroupDetails } from '../interfaces/groups';

@Injectable({
  providedIn: 'root',
})
export class GroupsService {
  private http = inject(HttpClient);

  getAllGroups(): Observable<IGroupData[]>{
    return this.http.get<IGroupData[]>(`group`)
  }

  getGroupDetails(id: string): Observable<IGroupDetails> {
    return this.http.get<IGroupDetails>(`group/${id}`)
  }

  createGroup(data: IGroupFormData): Observable<ICreateResponse> {
    return this.http.post<ICreateResponse>('group', data)
  }

  updateGroup(id: string, data: IGroupFormData): Observable<IUpdateResponse> {
    return this.http.put<IUpdateResponse>(`group/${id}`, data)
  }

  deleteGroup(id: string): Observable<IDeleteResponse> {
    return this.http.delete<IDeleteResponse>(`group/${id}`)
  }
}
