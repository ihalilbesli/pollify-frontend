import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/service-auth/auth.service';

export const roleGuard = (expectedRoles: string[]): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const userRole = authService.getUserRole();
    const isLoggedIn = authService.isLoggedIn();

    if (!isLoggedIn || !userRole || !expectedRoles.includes(userRole)) {
      router.navigate(['/welcome']);
      return false;
    }

    return true;
  };
};
