import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PollService } from '../../../services/service-poll/poll.service';

@Component({
  selector: 'app-poll-result',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './poll-result.component.html',
  styleUrl: './poll-result.component.css'
})
export class PollResultComponent {
  
  pollId!: number;
  pollResult: any;
  isLoading = true;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private pollService: PollService
  ) { }
  ngOnInit(): void {
    this.pollId = Number(this.route.snapshot.paramMap.get('pollId'));
    if (!this.pollId) {
      this.errorMessage = 'Geçersiz anket ID.';
      return;
    }

    this.pollService.getPollResults(this.pollId).subscribe({
      next: (data) => {
        this.pollResult = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Anket sonuçları alınamadı.';
        this.isLoading = false;
      },
    });
  }

}
