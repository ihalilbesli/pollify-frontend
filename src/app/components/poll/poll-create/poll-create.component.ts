import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Poll } from '../../../models/poll.model';
import { PollService } from '../../../services/service-poll/poll.service';
import { AuthService } from '../../../services/service-auth/auth.service';

@Component({
  selector: 'app-poll-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './poll-create.component.html',
  styleUrl: './poll-create.component.css'
})
export class PollCreateComponent {
  poll: Partial<Poll> = {
    title: '',
    description: '',
    active: true,
    onlyLoggedUsersCanVote: false,
    questions: []
  };
  errorMessage: string = '';

  constructor(private pollService: PollService, 
    private router: Router,
    private authService: AuthService 
) { }
createPoll() {
  if (!this.poll.title || this.poll.title.trim().length === 0) {
    this.errorMessage = 'Anket başlığı zorunludur.';
    console.warn('⚠️ Anket başlığı boş.');
    return;
  }

  console.log('📤 Gönderilmeye Hazır Anket:', this.poll);

  this.pollService.createPoll(this.poll as Poll).subscribe({
    next: (createdPoll) => {
      console.log('✅ Oluşturulan Anket:', createdPoll);
      alert('Anket başarıyla oluşturuldu!');
      this.router.navigate(['/poll', createdPoll.id, 'questions']);
    },
    error: (err) => {
      this.errorMessage = 'Anket oluşturulurken hata oluştu.';
      console.error('❌ Backend Hatası:', err);
      if (err.status === 400) {
        console.error('📛 Bad Request - Gönderilen veriler hatalı olabilir.');
      }
    }
  });
}

}
