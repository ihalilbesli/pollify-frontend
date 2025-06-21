import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PollService } from '../../../services/service-poll/poll.service';
import { Poll } from '../../../models/poll.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  polls: Poll[] = [];
  errorMessage: string = '';

  constructor(private pollService: PollService) {}

  ngOnInit(): void {
    this.loadActivePolls();
  }

  loadActivePolls(): void {
    this.pollService.getActivePolls().subscribe({
      next: (data) => {
        this.polls = data;
      },
      error: (error) => {
        this.errorMessage = 'Anketler yüklenirken bir hata oluştu.';
        console.error(error);
      }
    });
  }

}
