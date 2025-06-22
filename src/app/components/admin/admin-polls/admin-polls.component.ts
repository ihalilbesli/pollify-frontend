import { Component } from '@angular/core';
import { PollService } from '../../../services/service-poll/poll.service';
import { Poll } from '../../../models/poll.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-polls',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-polls.component.html',
  styleUrl: './admin-polls.component.css'
})
export class AdminPollsComponent {
polls: Poll[] = [];
  isLoading = false;

  constructor(private pollService: PollService) {}

  ngOnInit(): void {
    this.loadPolls();
  }

  loadPolls(): void {
    this.isLoading = true;
    this.pollService.getAllPolls().subscribe({
      next: (data) => {
        this.polls = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Anketler alınırken hata oluştu:', err);
        this.isLoading = false;
      }
    });
  }

  deletePoll(id: number): void {
    if (confirm('Bu anketi silmek istediğinize emin misiniz?')) {
      this.pollService.deletePoll(id).subscribe({
        next: () => {
          this.polls = this.polls.filter(p => p.id !== id);
        },
        error: (err) => {
          console.error('Silme işlemi başarısız:', err);
        }
      });
    }
  }
}
