import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ChevronLeft, LucideAngularModule } from 'lucide-angular';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'verification-page',
  standalone: true,
  imports: [RouterLink, LucideAngularModule, ReactiveFormsModule],
  providers: [AuthService],
  templateUrl: './verification-page.html',
})
export class VerificationPage {
  authService = inject(AuthService);
  router = inject(Router)

  readonly ChevronLeft = ChevronLeft;

  verificationForm = new FormGroup({
    code: new FormControl('')
  });

  async onSubmit() {
    const { code } = this.verificationForm.value;
    if (!code) {
      return;
    }

    const verified = await this.authService.verify(code);
    if (verified) {
      alert('Registration successful, please login');
      this.router.navigate(['/login']);
    } else {
      alert('Registration failed');
    }
  }

}
