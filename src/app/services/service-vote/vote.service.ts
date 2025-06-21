import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VoteRequest } from '../../models/vote-request.model';
import { forkJoin, Observable } from 'rxjs';
import { Poll } from '../../models/poll.model';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  private apiUrl = 'http://localhost:8080/pollify/votes';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  vote(pollId: number, questionId: number, optionId: number, userId?: number, ipAddress?: string): Observable<any> {
    const payload: VoteRequest = { pollId, questionId, optionId };
    if (userId !== undefined) {
      payload.userId = userId;
    }
    if (ipAddress !== undefined) {
      payload.ipAddress = ipAddress;
    }
    return this.http.post(`${this.apiUrl}`, payload, { headers: this.getHeaders() });
  }

  submitVotes(votes: VoteRequest[]): Observable<any> {
    return this.http.post(`${this.apiUrl}`, votes, { headers: this.getHeaders() });
  }

  hasUserVoted(pollId: number): Observable<{ hasVoted: boolean }> {
    const token = localStorage.getItem('token');
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;
    return this.http.get<{ hasVoted: boolean }>(`${this.apiUrl}/has-voted/${pollId}`, { headers });
  }
    getJoinedPolls(): Observable<Poll[]> {
  return this.http.get<Poll[]>(`${this.apiUrl}/joined-polls`, { headers: this.getHeaders() });
}
}
