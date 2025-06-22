import { Component, OnInit } from '@angular/core';
import { Complaint } from '../../models/complaint.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/service-auth/auth.service';
import { ComplaintService } from '../../services/service-complaint/complaint.service';


@Component({
  selector: 'app-complaint',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './complaint.component.html',
  styleUrl: './complaint.component.css'
})
export class ComplaintComponent implements OnInit {
  subject: string = '';
  description: string = '';
  subjects: string[] = [
    'Anket Sorunu',
    'Oylama Hatası',
    'Profil Problemi',
    'Diğer'
  ];

  isSubmitting = false;
  message = '';
  myComplaints: Complaint[] = [];

  // Güncelleme moduna geçiş için:
  isEditMode = false;
  editId: number | null = null;

  constructor(
    private complaintService: ComplaintService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadMyComplaints();
  }

loadMyComplaints() {
  this.complaintService.getMyComplaints().subscribe({
    next: (data) => this.myComplaints = data,
    error: () => console.error('Şikayetler yüklenemedi.')
  });
}

  submitComplaint() {
    if (!this.subject || !this.description) {
      this.message = 'Lütfen konu ve açıklama alanlarını doldurunuz.';
      return;
    }

    const complaint: Complaint = {
      subject: this.subject,
      description: this.description
    };

    this.isSubmitting = true;

    if (this.isEditMode && this.editId) {
      this.complaintService.updateComplaintByUser(this.editId, complaint).subscribe({
        next: () => {
          this.message = 'Şikayet başarıyla güncellendi.';
          this.resetForm();
          this.loadMyComplaints();
        },
        error: () => this.message = 'Güncelleme sırasında hata oluştu.',
        complete: () => this.isSubmitting = false
      });
    } else {
      this.complaintService.createComplaint(complaint).subscribe({
        next: () => {
          this.message = 'Şikayetiniz başarıyla gönderildi.';
          this.resetForm();
          this.loadMyComplaints();
        },
        error: () => this.message = 'Bir hata oluştu. Lütfen tekrar deneyiniz.',
        complete: () => this.isSubmitting = false
      });
    }
  }

  editComplaint(complaint: Complaint) {
    this.subject = complaint.subject;
    this.description = complaint.description;
    this.editId = complaint.id!;
    this.isEditMode = true;
    this.message = 'Düzenleme modundasınız.';
  }

  deleteComplaint(id: number) {
    if (confirm('Bu şikayeti silmek istiyor musunuz?')) {
      this.complaintService.deleteComplaint(id).subscribe({
        next: () => this.loadMyComplaints(),
        error: () => alert('Silme işlemi başarısız.')
      });
    }
  }

  resetForm() {
    this.subject = '';
    this.description = '';
    this.editId = null;
    this.isEditMode = false;
  }
}
