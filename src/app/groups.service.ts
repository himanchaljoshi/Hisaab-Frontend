import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  private groupsUrl = 'http://localhost:8080/api/groups';

  constructor(private http: HttpClient) { }

  addGroup(group: Group): Observable<Group> {
    return this.http.post<Group>(this.groupsUrl, group);
  }

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(this.groupsUrl);
  }

  getGroup(groupId: number): Observable<Group> {
    return this.http.get<Group>(`${this.groupsUrl}/${groupId}`);
  }

  editGroup(groupId: number, group: Group): Observable<any> {
    return this.http.put(`${this.groupsUrl}/${groupId}`, group);
  }

  deleteGroup(groupId: number): Observable<any> {
    return this.http.delete(`${this.groupsUrl}/${groupId}`);
  }

  getGroupExpensesByGroupId(groupId: number): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.groupsUrl}/${groupId}/expenses`);
  }

  addExpenseToGroup(groupId: number, expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(`${this.groupsUrl}/${groupId}/expenses`, expense);
  }

  deleteExpenseFromGroup(groupId: number, expenseId: number): Observable<void> {
    return this.http.delete<void>(`${this.groupsUrl}/${groupId}/expenses/${expenseId}`);
  }

  getMembersForGroup(groupId: number): Observable<Member[]> {
    return this.http.get<Member[]>(`${this.groupsUrl}/${groupId}/members`);
  }

  addGroupMembers(groupId: number, usernames: string | string[]): Observable<Member[]> {
    let url = `${this.groupsUrl}/${groupId}/addMembers`;
    let body = Array.isArray(usernames) ? usernames : [usernames];
    return this.http.post<Member[]>(url, JSON.stringify(body), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  

  deleteMemberFromGroup(groupId: number, userId: number): Observable<void> {
    return this.http.delete<void>(`${this.groupsUrl}/${groupId}/members/${userId}`);
  }
}

export interface Group {
  groupId?: number;
  groupName: string;
}

export interface Member {
  id: number;
  username: string;
  name: string;
}

export interface Expense {
  id: number;
  description: string;
  amount: number;
}
