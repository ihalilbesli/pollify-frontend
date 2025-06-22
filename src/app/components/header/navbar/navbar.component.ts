import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/service-auth/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  showDropdown = false;
  currentTime: string = '';

  userRole: string | null = null;

  constructor(
    public authService: AuthService,
    private router: Router) { }

  goHome() {
    const role = this.authService.getUserRole();
    console.log(role)
    if (role === 'ADMIN') {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.userRole = this.authService.getUserRole(); 
    this.updateTime();
    setInterval(() => this.updateTime(), 1000);
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  logout() {
    this.authService.logout();
    this.showDropdown = false;
  }

  updateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleString('tr-TR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }
}
