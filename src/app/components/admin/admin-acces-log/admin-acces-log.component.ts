import { Component } from '@angular/core';
import { AccessLogService } from '../../../services/service-access-log/acces-log.service';
import { AccessLog } from '../../../models/access-log.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-acces-log',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-acces-log.component.html',
  styleUrl: './admin-acces-log.component.css'
})
export class AdminAccesLogComponent {
  logs: AccessLog[] = [];
  filterType: string = 'all';
  filterValue: string = '';

  // Kullanıcı dostu rol seçenekleri
  roleOptions = [
    { label: 'Yönetici', value: 'ADMIN' },
    { label: 'Kullanıcı', value: 'USER' },
    { label: 'Anonim', value: 'GIRIS_YAPMAMIS' }
  ];

  statusOptions = ['BAŞARILI', 'HATA'];
  periodOptions = ['day', 'week', 'month', 'year'];

  constructor(private accessLogService: AccessLogService) {}

  ngOnInit(): void {
    this.loadAllLogs();
  }

  loadAllLogs(): void {
    this.accessLogService.getAllLogs().subscribe({
      next: (data) => {
        this.logs = data.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      },
      error: () => alert('Loglar yüklenemedi.')
    });
  }

  applyFilter(): void {
    const handleResult = (data: AccessLog[]) =>
      this.logs = data.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    if (this.filterType === 'email') {
      this.accessLogService.getLogsByEmail(this.filterValue).subscribe({ next: handleResult });
    } else if (this.filterType === 'role') {
      this.accessLogService.getLogsByRole(this.filterValue).subscribe({ next: handleResult });
    } else if (this.filterType === 'status') {
      this.accessLogService.getLogsByStatus(this.filterValue).subscribe({ next: handleResult });
    } else if (this.filterType === 'period') {
      this.accessLogService.getLogsByPeriod(this.filterValue as any).subscribe({ next: handleResult });
    } else {
      this.loadAllLogs();
    }
  }

  clearFilter(): void {
    this.filterValue = '';
    this.filterType = 'all';
    this.loadAllLogs();
  }
}
