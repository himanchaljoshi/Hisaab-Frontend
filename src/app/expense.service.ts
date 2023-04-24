import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private apiUrl = 'http://localhost:8080/api/expenses';

  constructor(private http: HttpClient) {}

  addExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(`${this.apiUrl}/personal`, expense);
  }

  getTotalExpenses(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total/month`);
  }

  

  getExpensesByCategory(categoryId: number): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.apiUrl}/${categoryId}/expenses`);
  }

  getRecentExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.apiUrl}/personal/recent`);
  }
}
 


export interface Expense {
  id?: number;
  description: string;
  amount: number;
  categoryId: number;
}
