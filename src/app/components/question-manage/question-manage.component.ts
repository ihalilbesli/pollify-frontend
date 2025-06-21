import { Component } from '@angular/core';
import { Question } from '../../models/question.model';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { QuestionService } from '../../services/service-question/question.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-question-manage',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './question-manage.component.html',
  styleUrl: './question-manage.component.css'
})
export class QuestionManageComponent {
  pollId!: number;
  questions: Question[] = [];
  newQuestionText: string = '';
  newQuestionType: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' = 'SINGLE_CHOICE';
  errorMessage: string = '';

  // Yeni eklenen alanlar
  editedQuestion: Question | null = null;

  constructor(private route: ActivatedRoute, private questionService: QuestionService) { }

  ngOnInit(): void {
    this.pollId = Number(this.route.snapshot.paramMap.get('pollId'));
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.questionService.getByPoll(this.pollId).subscribe({
      next: (questions) => this.questions = questions,
      error: (err) => {
        this.errorMessage = 'Sorular yüklenirken hata oluştu.';
        console.error(err);
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
      error: (err) => {
        this.errorMessage = 'Soru eklenirken hata oluştu.';
        console.error(err);
      }
    });
  }

  // Düzenlemeye başla
  startEdit(question: Question): void {
    this.editedQuestion = { ...question };  
  }

  // Düzenlemeyi iptal et
 saveEdit(): void {
  if (!this.editedQuestion) return;

  this.questionService.updateQuestion(this.editedQuestion.id, {
    text: this.editedQuestion.text,
    type: this.editedQuestion.type
  }).subscribe({
    next: (updated) => {
      // Güncellenen soruyu questions dizisinde bulup güncelle
      const index = this.questions.findIndex(q => q.id === updated.id);
      if (index !== -1) {
        this.questions[index] = updated;
      }
      this.editedQuestion = null; // Düzenlemeyi kapat
      this.errorMessage = '';
    },
    error: (err) => {
      this.errorMessage = 'Soru güncellenirken hata oluştu.';
      console.error(err);
    }
  });
}

// Düzenlemeyi iptal etme
cancelEdit(): void {
  this.editedQuestion = null;
}
}
