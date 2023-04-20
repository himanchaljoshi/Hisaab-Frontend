import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private baseUrl = 'http://localhost:8080/api/members';

  constructor(private http: HttpClient) { }

  saveMemberData(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, data);
  }

  findUserByUsername(username: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/username/${username}`);
  }

  validateLogin(username: string, password: string): Observable<boolean> {
    const userData = {
      username,
      password
    };
    return this.http.post<boolean>(`${this.baseUrl}/validate`, userData);
  }
  
}
