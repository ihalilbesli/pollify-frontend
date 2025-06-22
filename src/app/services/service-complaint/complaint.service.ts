import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Complaint } from '../../models/complaint.model';


@Injectable({
  providedIn: 'root'
})
export class ComplaintService {
  private apiUrl = 'http://localhost:8080/pollify/complaints';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  //  Yeni şikayet oluştur
  createComplaint(complaint: Complaint): Observable<Complaint> {
    return this.http.post<Complaint>(this.apiUrl, complaint, { headers: this.getHeaders() });
  }

  //  Tüm şikayetleri getir (Admin için)
  getAllComplaints(): Observable<Complaint[]> {
    return this.http.get<Complaint[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  //  ID'ye göre getir
  getComplaintById(id: number): Observable<Complaint> {
    return this.http.get<Complaint>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  //  Kullanıcının kendi şikayetleri
  getMyComplaints(): Observable<Complaint[]> {
    return this.http.get<Complaint[]>(`${this.apiUrl}/my`, { headers: this.getHeaders() });
  }

 updateComplaintByUser(id: number, complaint: Complaint): Observable<Complaint> {
  return this.http.put<Complaint>(`${this.apiUrl}/user-update/${id}`, complaint, { headers: this.getHeaders() });
}
updateComplaintByAdmin(id: number, complaint: Complaint): Observable<Complaint> {
  return this.http.put<Complaint>(`${this.apiUrl}/admin-update/${id}`, complaint, { headers: this.getHeaders() });
}

  //  Şikayet sil
  deleteComplaint(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
