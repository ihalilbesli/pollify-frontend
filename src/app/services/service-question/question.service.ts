import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private apiUrl = 'http://localhost:8080/pollify/questions';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  // Belirli bir ankete ait tüm soruları getirir
  getByPoll(pollId: number): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}/by-poll/${pollId}`, { headers: this.getHeaders() });
  }

  // Yeni bir soru oluşturur
 createQuestion(questionPayload: any): Observable<Question> {
  return this.http.post<Question>(this.apiUrl, questionPayload, { headers: this.getHeaders() });
}

  // Birden fazla soru toplu olarak kaydeder
  createQuestions(questions: Question[]): Observable<Question[]> {
    return this.http.post<Question[]>(`${this.apiUrl}/batch`, questions, { headers: this.getHeaders() });
  }
  updateQuestion(id: number, payload: any): Observable<Question> {
  return this.http.put<Question>(`${this.apiUrl}/${id}`, payload, { headers: this.getHeaders() });
}
}
