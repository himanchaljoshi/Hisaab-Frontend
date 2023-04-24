import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { GroupexpenseService } from './groupexpense.service';

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

  getGroupExpensesByGroupId(groupId: number): Observable<GroupExpense[]> {
    return this.http.get<GroupExpense[]>(`${this.groupsUrl}/${groupId}/expenses`);
  }

  
  addGroupExpense(groupId: number, groupExpense: GroupExpense, paidBy: string, participants: string[]): Observable<GroupExpense> {
    return this.http.post<GroupExpense>('http://localhost:8080/api/group-expenses', groupExpense).pipe(
      tap((expense: GroupExpense) => {
        const storageKey = `group-${groupId}-expenses`;
        const existingExpensesStr = localStorage.getItem(storageKey);
        const existingExpenses = existingExpensesStr ? JSON.parse(existingExpensesStr) : [];
  
        const splitAmount = expense.amount / participants.length;
        const splitExpenses = participants.map(participant => ({
          ...expense,
          amount: splitAmount,
          participant,
          owedBy: participant !== paidBy ? paidBy : null,
        }));
  
  
        // Update the balances of the participants
        const membersStorageKey = `group-${groupId}-members`;
        const existingMembersStr = localStorage.getItem(membersStorageKey);
        const existingMembers: Member[] = existingMembersStr ? JSON.parse(existingMembersStr) : [];
  
        participants.forEach(participant => {
          const memberIndex = existingMembers.findIndex((m: Member) => m.username === participant);
          if (memberIndex !== -1) {
            if (participant === paidBy) {
              existingMembers[memberIndex].balance = (existingMembers[memberIndex].balance || 0) + expense.amount - splitAmount;
            } else {
              existingMembers[memberIndex].balance = (existingMembers[memberIndex].balance || 0) - splitAmount;
            }
          }
        });
  
        localStorage.setItem(storageKey, JSON.stringify([...existingExpenses, ...splitExpenses]));
        localStorage.setItem(membersStorageKey, JSON.stringify(existingMembers));
      })
    );
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
  id: number ;
  username: string;
  name: string;
  balance?: number; 
}

export interface GroupExpense {
  id: number;
  description: string;
  amount: number;
  participant?: string;
  paidBy?: string;
  owedBy?: string;
}


