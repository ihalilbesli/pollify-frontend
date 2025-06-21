import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PollService } from '../../../services/service-poll/poll.service';
import { VoteService } from '../../../services/service-vote/vote.service';
import { AuthService } from '../../../services/service-auth/auth.service';
import { Poll } from '../../../models/poll.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-poll-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './poll-detail.component.html',
  styleUrls: ['./poll-detail.component.css']
})
export class PollDetailComponent {
  pollId!: number;
  poll?: Poll;
  errorMessage: string = '';
  isLoggedIn: boolean = false;
  hasVoted: boolean = false;

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
    this.loadPollDetails();

    // Giriş yapmasa bile kontrol et (IP adresine göre)
    this.checkIfUserHasVoted();
  }

  loadPollDetails(): void {
    this.pollService.getPollById(this.pollId).subscribe({
      next: (data) => this.poll = data,
      error: (err) => {
        this.errorMessage = 'Anket detayları yüklenirken hata oluştu.';
        console.error(err);
      }
    });
  }

  checkIfUserHasVoted(): void {
    this.voteService.hasUserVoted(this.pollId).subscribe({
      next: (res) => {
        this.hasVoted = res.hasVoted;
      },
      error: (err) => {
        console.error('Oy durumu kontrolü başarısız:', err);
      }
    });
  }

  canStartPoll(): boolean {
    if (!this.poll) return false;
    if (this.poll.onlyLoggedUsersCanVote && !this.isLoggedIn) return false;
    if (!this.poll.active) return false;
    if (this.hasVoted) return false;  // Daha önce oy verildiyse devre dışı
    return true;
  }

  startPoll(): void {
    if (this.canStartPoll()) {
      this.router.navigate(['/poll', this.pollId, 'solve']);
    }
  }
}
