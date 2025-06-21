import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PollService } from '../../../services/service-poll/poll.service';
import { QuestionService } from '../../../services/service-question/question.service';
import { Poll } from '../../../models/poll.model';
import { Question } from '../../../models/question.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-poll-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './poll-edit.component.html',
  styleUrl: './poll-edit.component.css'
})
export class PollEditComponent {
  pollId!: number;
  poll?: Poll;
  questions: Question[] = [];

  newQuestionText = '';
  newQuestionType: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' = 'SINGLE_CHOICE';

  editedQuestion: Question | null = null;
  editText: string = '';
  editType: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' = 'SINGLE_CHOICE';

  errorMessage = '';
  successMessage = '';

  constructor(
    private route: ActivatedRoute,
    private pollService: PollService,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.pollId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadPoll();
    this.loadQuestions();
  }

  loadPoll(): void {
    this.pollService.getPollById(this.pollId).subscribe({
      next: (poll) => this.poll = poll,
      error: () => this.errorMessage = 'Anket bilgileri yüklenirken hata oluştu.'
    });
  }

  loadQuestions(): void {
    this.questionService.getByPoll(this.pollId).subscribe({
      next: (questions) => this.questions = questions,
      error: () => this.errorMessage = 'Sorular yüklenirken hata oluştu.'
    });
  }

  savePoll(): void {
    if (!this.poll || !this.poll.id) return;

    this.pollService.updatePoll(this.poll.id, this.poll).subscribe({
      next: () => {
        this.successMessage = 'Anket başarıyla güncellendi.';
        this.errorMessage = '';
      },
      error: () => {
        this.errorMessage = 'Anket güncellenirken hata oluştu.';
        this.successMessage = '';
      }
    });
  }

  addQuestion(): void {
    if (!this.newQuestionText.trim()) {
      this.errorMessage = 'Soru metni boş olamaz.';
      return;
    }

    const questionPayload = {
      text: this.newQuestionText,
      type: this.newQuestionType,
      pollId: this.pollId
    };

    this.questionService.createQuestion(questionPayload).subscribe({
      next: (created) => {
        this.questions.push(created);
        this.newQuestionText = '';
        this.newQuestionType = 'SINGLE_CHOICE';
        this.errorMessage = '';
      },
      error: () => {
        this.errorMessage = 'Soru eklenirken hata oluştu.';
      }
    });
  }

  openEditSheet(question: Question): void {
    this.editedQuestion = { id: question.id } as Question;
    this.editText = question.text;
    this.editType = question.type;
  }

  closeEditSheet(): void {
    this.editedQuestion = null;
    this.editText = '';
    this.editType = 'SINGLE_CHOICE';
  }

  updateQuestion(): void {
    if (!this.editedQuestion) return;

    const payload = {
      text: this.editText,
      type: this.editType
    };

    this.questionService.updateQuestion(this.editedQuestion.id!, payload).subscribe({
      next: (updated) => {
        const index = this.questions.findIndex(q => q.id === updated.id);
        if (index > -1) this.questions[index] = updated;
        this.closeEditSheet();
      },
      error: () => {
        this.errorMessage = 'Soru güncellenirken hata oluştu.';
      }
    });
  }

  cancelEditing(): void {
    this.closeEditSheet();
    this.errorMessage = '';
  }
}
