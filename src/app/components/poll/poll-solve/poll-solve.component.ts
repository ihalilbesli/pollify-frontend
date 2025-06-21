import { Component, OnInit } from '@angular/core';
import { Poll } from '../../../models/poll.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PollService } from '../../../services/service-poll/poll.service';
import { AuthService } from '../../../services/service-auth/auth.service';
import { Question } from '../../../models/question.model';
import { VoteService } from '../../../services/service-vote/vote.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VoteRequest } from '../../../models/vote-request.model';

@Component({
  selector: 'app-poll-solve',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './poll-solve.component.html',
  styleUrls: ['./poll-solve.component.css']
})
export class PollSolveComponent implements OnInit {
  pollId!: number;
  poll?: Poll;
  selectedOptions: Map<number, number[]> = new Map();
  errorMessage: string = '';
  isLoggedIn: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private pollService: PollService,
    private voteService: VoteService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.pollId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadPoll();
  }

  loadPoll(): void {
    this.pollService.getPollById(this.pollId).subscribe({
      next: (data) => {
        console.log('Poll ve sorular + seçenekler:', data);
        this.poll = data;
      },
      error: (err) => {
        this.errorMessage = 'Anket yüklenirken hata oluştu.';
        console.error(err);
      }
    });
  }
  onOptionSelect(question: Question, optionId: number, event: any): void {
    const selected = this.selectedOptions.get(question.id) || [];

    if (question.type === 'SINGLE_CHOICE') {
      // Tek seçenek seçme durumu (radio)
      this.selectedOptions.set(question.id, [optionId]);
    } else {
      // Çoklu seçenek seçme durumu (checkbox)
      if (event.target.checked) {
        if (!selected.includes(optionId)) {
          selected.push(optionId);
        }
      } else {
        const index = selected.indexOf(optionId);
        if (index > -1) {
          selected.splice(index, 1);
        }
      }
      this.selectedOptions.set(question.id, selected);
    }
  }

  submitVotes(): void {
    if (!this.poll) return;

    if (!this.isLoggedIn && this.poll.onlyLoggedUsersCanVote) {
      this.errorMessage = 'Bu ankete oy vermek için giriş yapmanız gerekmektedir.';
      return;
    }

    const votesToSend: VoteRequest[] = [];

    for (const question of this.poll.questions) {
      const selectedOptionIds = this.selectedOptions.get(question.id) || [];
      for (const optionId of selectedOptionIds) {
        votesToSend.push({
          pollId: this.poll.id,
          optionId: optionId,
          questionId: question.id,
        });
      }
    }

    if (votesToSend.length === 0) {
      this.errorMessage = 'Lütfen en az bir seçenek seçin.';
      return;
    }

    this.voteService.submitVotes(votesToSend).subscribe({
      next: (response: any) => {
        if (response?.ok) {
          this.errorMessage = '';
          alert(response.message || 'Oylarınız kaydedildi!');
          this.router.navigate(['/poll-results', this.pollId]); 
        } else {
          this.errorMessage = response?.error || 'Oy gönderilirken hata oluştu.';
        }
      },
      error: (err) => {
        if (err.status === 409 && err.error?.error) {
          this.errorMessage = err.error.error;
        } else {
          this.errorMessage = 'Oy gönderilirken hata oluştu.';
        }
        console.error(err);
      }
    });

  }


}
