import { Component } from '@angular/core';
import { Complaint } from '../../../models/complaint.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComplaintService } from '../../../services/service-complaint/complaint.service';

@Component({
  selector: 'app-admin-complaints',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-complaints.component.html',
  styleUrl: './admin-complaints.component.css'
})
export class AdminComplaintsComponent {
  complaints: Complaint[] = [];

  constructor(private complaintService: ComplaintService) { }

  ngOnInit(): void {
    this.loadComplaints();
  }

  loadComplaints(): void {
    this.complaintService.getAllComplaints().subscribe({
      next: (data) => (this.complaints = data),
      error: () => console.error('Şikayetler yüklenemedi.')
    });
  }

  updateComplaintAsAdmin(c: Complaint): void {
    // Eğer durum 'COZULDU' ve adminNote boşsa işlem yapma
    if (c.status === 'COZULDU' && (!c.adminNote || c.adminNote.trim() === '')) {
      alert('Şikayet "Çözüldü" olarak işaretlenmeden önce admin notu girilmelidir.');
      return;
    }

    this.complaintService.updateComplaintByAdmin(c.id!, c).subscribe({
      next: () => alert('Şikayet güncellendi'),
      error: () => alert('Güncelleme sırasında hata oluştu')
    });
  }

  deleteComplaint(id: number): void {
    if (confirm('Bu şikayeti silmek istediğinize emin misiniz?')) {
      this.complaintService.deleteComplaint(id).subscribe({
        next: () => {
          this.complaints = this.complaints.filter((c) => c.id !== id);
        },
        error: () => alert('Silme işlemi başarısız')
      });
    }
  }

}
