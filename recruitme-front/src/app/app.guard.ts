// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './services/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiresAuth = route.data['requiresAuth'] ?? true;
    const requiredRole = route.data['role'] as string;

    const user = this.authService.getUser();

    const isAuthenticated = !!user;

    // Handle (login, register)
    if (!requiresAuth) {
      if (isAuthenticated) {
        this.router.navigate(['/forbidden']); // Redirect logged in users
        return false;
      }
      return true;
    }

    // Handle authenticated routes
    if (!isAuthenticated) {
      this.router.navigate(['/forbidden']);
      return false;
    }

    // Check role if specified
    if (requiredRole && requiredRole != user.role) {
      this.router.navigate(['/forbidden']);
      return false;
    }

    return true;
  }
}