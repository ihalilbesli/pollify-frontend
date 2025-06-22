import { Component } from '@angular/core';
import { AuthService } from '../../../services/service-auth/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthRequest } from '../../../models/auth-request.model';
import { AuthResponse } from '../../../models/auth-response.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  showPassword = false;


  constructor(private authService: AuthService, private router: Router) { }

 login() {
  const credentials: AuthRequest = {
    email: this.email,
    password: this.password,
  };

  this.authService.login(credentials).subscribe({
    next: (response: AuthResponse) => {
      localStorage.setItem('token', response.token);
      this.errorMessage = '';

      const role = this.authService.getUserRole();

      if (role === 'ADMIN') {
        this.router.navigate(['/admin']); 
      } else {
        this.router.navigate(['/']); 
      }
    },
    error: (err) => {
      this.errorMessage = 'Email veya şifre hatalı!';
      console.error(err);
    },
  });
}


  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

}
