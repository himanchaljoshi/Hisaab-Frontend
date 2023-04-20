import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'http://localhost:8080/api/categories';

  constructor(private http: HttpClient) {}

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.apiUrl}/create`, category);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }
}

export interface Category {
  categoryId?: number;
  categoryName: string;
}
