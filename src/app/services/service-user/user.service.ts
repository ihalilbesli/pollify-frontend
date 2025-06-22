import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
   private apiUrl = 'http://localhost:8080/pollify/users';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }
  //  Tüm kullanıcıları getir (Admin)
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/admin/users`, {
      headers: this.getHeaders()
    });
  }

  //  Kullanıcı sil (Admin)
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/admin/users/${id}`, {
      headers: this.getHeaders()
    });
  }
}
