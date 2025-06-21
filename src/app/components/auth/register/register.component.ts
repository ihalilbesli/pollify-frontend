import { Component } from '@angular/core';
import { AuthService } from '../../../services/service-auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegisterRequest } from '../../../models/register-request.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  showPassword = false;

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    const data: RegisterRequest = {
      email: this.email,
      password: this.password,
    };

    this.authService.register(data).subscribe({
      next: () => {
        this.successMessage = 'Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz.';
        this.errorMessage = '';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.errorMessage = 'Kayıt sırasında hata oluştu. Email zaten kullanılıyor olabilir.';
        this.successMessage = '';
        console.error(err);
      },
    });
  }


  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

}
