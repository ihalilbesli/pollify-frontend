import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthRequest } from '../../models/auth-request.model';
import { AuthResponse } from '../../models/auth-response.model';
import { RegisterRequest } from '../../models/register-request.model';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/pollify/auth';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }
   login(credentials: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials, {
    });
  }

 register(data: RegisterRequest): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/register`, data);
}

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

   decodeToken(): any | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      return jwtDecode(token);
    } catch (e) {
      return null;
    }
  }

  getUserId(): number | null {
    const decoded = this.decodeToken();
    return decoded && decoded.sub ? Number(decoded.sub) : null;
  }

  getUserRole(): string | null {
    const decoded = this.decodeToken();
    return decoded && decoded.role ? decoded.role : null;
  }

  getUserEmail(): string | null {
    const decoded = this.decodeToken();
    return decoded && decoded.email ? decoded.email : null;
  }
}
