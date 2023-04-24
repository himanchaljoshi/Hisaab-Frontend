import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupexpenseService {
  private baseUrl = 'http://localhost:8080/api/group-expenses';

  constructor(private http: HttpClient) { }

  createGroupExpense(groupId: number, groupExpense: GroupExpense, paidBy: string, participants: string[]): Observable<GroupExpense> {   
     return this.http.post<any>(`${this.baseUrl}`, groupExpense);
  }

  updateGroupExpense(id: number, groupExpense: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, groupExpense);
  }

  deleteGroupExpense(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  getGroupExpenseById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  getAllGroupExpenses(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`);
  }

  addParticipants(id: number, participants: string[]): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}/participants`, participants);
  }

  splitExpense(id: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}/split`, {});
  }

  

}

export interface GroupExpense {
  id: number;
  description: string;
  amount: number;
}


