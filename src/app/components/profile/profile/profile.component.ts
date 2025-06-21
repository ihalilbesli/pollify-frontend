import { Component } from '@angular/core';
import { AuthService } from '../../../services/service-auth/auth.service';
import { UserService } from '../../../services/service-user/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  email: string | null = null;
  role: string | null = null;

 
  constructor(private authService: AuthService, private userService: UserService) {}

  ngOnInit(): void {
    this.role = this.authService.getUserRole();

    const userId = this.authService.getUserId();
    if (userId) {
      this.userService.getById(userId).subscribe({
        next: user => this.email = user.email,
        error: err => console.error('Kullanıcı bilgisi alınamadı:', err)
      });
    }
  }
}
