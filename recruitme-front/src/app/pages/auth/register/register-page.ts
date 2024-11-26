import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ChevronLeft, LoaderCircle, LucideAngularModule } from 'lucide-angular';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'register-page',
  standalone: true,
  imports: [RouterLink, LucideAngularModule, ReactiveFormsModule],
  providers: [AuthService],
  templateUrl: './register-page.html',
})
export class RegisterPage {
  authService = inject(AuthService);
  router = inject(Router)

  readonly ChevronLeft = ChevronLeft;
  readonly LoaderCircle = LoaderCircle;

  isLoading = false;

  error = "";

  registerForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    role: new FormControl('USER')
  });

  async onSubmit() {
    const { username, email, password, confirmPassword, role } = this.registerForm.value;
    if (!username || !email || !password || !confirmPassword || !role) {
      return;
    }
    if (password !== confirmPassword) {
      // alert('Passwords do not match');
      this.error = 'Passwords do not match'
      return;
    }

    this.isLoading = true;
    const isRegistered = await this.authService.register(username, email, password, role);
    this.isLoading = false;
    if (isRegistered) {
      alert('Registration successful, please verify your email');
      this.router.navigate(['register/verify']);
    } else {
      // alert('Registration failed');
      this.error = 'Registration failed';
    }
  }

  // Helper function to toggle role
  toggleRole() {
    const currentRole = this.registerForm.get('role')?.value;
    this.registerForm.patchValue({
      role: currentRole === 'USER' ? 'RECRUITER' : 'USER'
    });
  }
}
