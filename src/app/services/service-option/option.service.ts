import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Option } from '../../models/option.model';

@Injectable({
  providedIn: 'root'
})
export class OptionService {

  private apiUrl = 'http://localhost:8080/pollify/options';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  // Belirli bir soruya ait seçenekleri getir
  getByQuestion(questionId: number): Observable<Option[]> {
    return this.http.get<Option[]>(`${this.apiUrl}/by-question/${questionId}`, { headers: this.getHeaders() });
  }

createOption(option: { text: string; voteCount: number; questionId: number }): Observable<Option> {
  return this.http.post<Option>(this.apiUrl, option, { headers: this.getHeaders() });
}
  

  // Toplu seçenek ekle
  createOptions(options: Option[]): Observable<Option[]> {
    return this.http.post<Option[]>(`${this.apiUrl}/batch`, options, { headers: this.getHeaders() });
  }
}
