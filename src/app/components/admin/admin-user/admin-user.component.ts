import { Component } from '@angular/core';
import { UserService } from '../../../services/service-user/user.service';
import { User } from '../../../models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-user',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-user.component.html',
  styleUrl: './admin-user.component.css'
})
export class AdminUserComponent {

  users: User[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.isLoading = true;
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Kullanıcılar yüklenemedi.';
        this.isLoading = false;
      }
    });
  }

  deleteUser(id: number): void {
    if (!confirm('Bu kullanıcıyı silmek istediğinize emin misiniz?')) return;

    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.users = this.users.filter(user => user.id !== id);
      },
      error: () => {
        this.errorMessage = 'Kullanıcı silinemedi.';
      }
    });
  }
}
