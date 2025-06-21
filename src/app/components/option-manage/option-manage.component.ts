import { Component } from '@angular/core';
import { Option } from '../../models/option.model';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OptionService } from '../../services/service-option/option.service';

@Component({
  selector: 'app-option-manage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './option-manage.component.html',
  styleUrl: './option-manage.component.css'
})
export class OptionManageComponent {

  questionId!: number;
  options: Option[] = [];
  newOptionText: string = '';
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private optionService: OptionService) { }

  ngOnInit(): void {
    this.questionId = Number(this.route.snapshot.paramMap.get('questionId'));
    this.loadOptions();
  }

  loadOptions(): void {
    this.optionService.getByQuestion(this.questionId).subscribe({
      next: (options) => this.options = options,
      error: (err) => {
        this.errorMessage = 'Seçenekler yüklenirken hata oluştu.';
        console.error(err);
      }
    });
  }

 addOption(): void {
  if (!this.newOptionText.trim()) {
    this.errorMessage = 'Seçenek metni boş olamaz.';
    return;
  }

  const newOption = {
    text: this.newOptionText,
    voteCount: 0,
    questionId: this.questionId
  };

  console.log('Backend\'e gönderilen seçenek:', newOption);

  this.optionService.createOption(newOption).subscribe({
    next: (option) => {
      this.options.push(option);
      this.newOptionText = '';
      this.errorMessage = '';
    },
    error: (err) => {
      this.errorMessage = 'Seçenek eklenirken hata oluştu.';
      console.error(err);
    }
  });
}
}
