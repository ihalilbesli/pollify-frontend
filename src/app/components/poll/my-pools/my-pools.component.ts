import { Component } from '@angular/core';
import { PollService } from '../../../services/service-poll/poll.service';
import { AuthService } from '../../../services/service-auth/auth.service';
import { Poll } from '../../../models/poll.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-my-pools',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './my-pools.component.html',
  styleUrl: './my-pools.component.css'
})
export class MyPoolsComponent {
   polls: Poll[] = [];
  errorMessage = '';

  constructor(private pollService: PollService, private authService: AuthService) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.pollService.getPollsByUser(userId).subscribe({
        next: polls => this.polls = polls,
        error: err => {
          this.errorMessage = 'Anketler yüklenirken hata oluştu.';
          console.error(err);
        }
      });
    } else {
      this.errorMessage = 'Kullanıcı bilgisi bulunamadı.';
    }
  }
  deletePoll(pollId: number): void {
  if (confirm('Bu anketi silmek istediğinize emin misiniz?')) {
    this.pollService.deletePoll(pollId).subscribe({
      next: () => {
        this.polls = this.polls.filter(poll => poll.id !== pollId);
      },
      error: (err) => {
        alert('Anket silinirken hata oluştu.');
        console.error(err);
      }
    });
  }
}

}
