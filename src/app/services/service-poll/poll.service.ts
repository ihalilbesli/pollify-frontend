import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Poll } from '../../models/poll.model';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  private apiUrl = 'http://localhost:8080/pollify/polls';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }
  getAllPolls(): Observable<Poll[]> {
    return this.http.get<Poll[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getActivePolls(): Observable<Poll[]> {
    return this.http.get<Poll[]>(`${this.apiUrl}/active`, { headers: this.getHeaders() });
  }

  getPollById(id: number): Observable<Poll> {
    return this.http.get<Poll>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
  getPollsByUser(userId: number): Observable<Poll[]> {
    return this.http.get<Poll[]>(`${this.apiUrl}/by-user/${userId}`, { headers: this.getHeaders() });
  }

  createPoll(poll: Poll): Observable<Poll> {
    return this.http.post<Poll>(this.apiUrl, poll, { headers: this.getHeaders() });
  }

  updatePoll(id: number, poll: Poll): Observable<Poll> {
    return this.http.put<Poll>(`${this.apiUrl}/${id}`, poll, { headers: this.getHeaders() });
  }

  deletePoll(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
  getPollResults(pollId: number) {
    return this.http.get<any>(`${this.apiUrl}/results/${pollId}`);
  }

}
