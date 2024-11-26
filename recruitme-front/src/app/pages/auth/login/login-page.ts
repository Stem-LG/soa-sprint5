import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ChevronLeft, LucideAngularModule } from 'lucide-angular';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'login-page',
  standalone: true,
  imports: [RouterLink, LucideAngularModule, ReactiveFormsModule],
  providers: [AuthService],
  templateUrl: './login-page.html',
})
export class LoginPage {

  authService = inject(AuthService);
  router = inject(Router)

  readonly ChevronLeft = ChevronLeft;

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  async onSubmit() {
    const { email, password } = this.loginForm.value;
    if (!email || !password) {
      return;
    }
    const isValid = await this.authService.login(email, password);

    if (!isValid) {
      alert('Invalid email or password');
    }
    else {
      if (this.authService.getUser()?.role === 'ADMIN') {
        this.router.navigate(['/recruiter']);
      } else {
        this.router.navigate(['/']);
      }
    }
  }
}
