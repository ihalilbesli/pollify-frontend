import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccessLog } from '../../models/access-log.model';

@Injectable({
  providedIn: 'root'
})
export class AccessLogService {
  private apiUrl = 'http://localhost:8080/pollify/logs';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  getAllLogs(): Observable<AccessLog[]> {
    return this.http.get<AccessLog[]>(`${this.apiUrl}`, { headers: this.getHeaders() });
  }

  getLogsByEmail(email: string): Observable<AccessLog[]> {
    return this.http.get<AccessLog[]>(`${this.apiUrl}/email/${email}`, { headers: this.getHeaders() });
  }

  getLogsByRole(role: string): Observable<AccessLog[]> {
    return this.http.get<AccessLog[]>(`${this.apiUrl}/role/${role}`, { headers: this.getHeaders() });
  }

  getLogsByStatus(status: string): Observable<AccessLog[]> {
    return this.http.get<AccessLog[]>(`${this.apiUrl}/status/${status}`, { headers: this.getHeaders() });
  }

  getLogsByPeriod(period: 'day' | 'week' | 'month' | 'year'): Observable<AccessLog[]> {
    const params = new HttpParams().set('period', period);
    return this.http.get<AccessLog[]>(`${this.apiUrl}/period`, { params, headers: this.getHeaders() });
  }
}
