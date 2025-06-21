import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Poll } from '../../../models/poll.model';
import { PollService } from '../../../services/service-poll/poll.service';
import { Router } from '@angular/router';
import { VoteService } from '../../../services/service-vote/vote.service';

@Component({
  selector: 'app-poll-joined',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './poll-joined.component.html',
  styleUrl: './poll-joined.component.css'
})
export class PollJoinedComponent {

  joinedPolls: Poll[] = [];
  errorMessage = '';
  isLoading = true;

  constructor(private voteService: VoteService, private router: Router) { }

  ngOnInit(): void {
    this.voteService.getJoinedPolls().subscribe({
      next: (polls) => {
        this.joinedPolls = polls;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Katıldığınız anketler alınırken hata oluştu.';
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  viewResults(pollId: number): void {
    this.router.navigate(['/poll-results', pollId]);
  }

}
