import { Component, inject, OnInit, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { matchPasswordValidator } from '../../../../shared/validators/confirm-password-validator';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { AuthLayout } from '../../../../shared/layouts/auth-layout/auth-layout';
import { FormField } from '../../../../shared/components/auth/form-field/form-field';

@Component({
  standalone: true,
  selector: 'app-reset-password',
  imports: [
    TranslatePipe,
    ReactiveFormsModule,
    FormField,
    ButtonModule,
    AuthLayout
  ],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss',
})
export class ResetPassword implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly messageService = inject(MessageService);
  private translate = inject(TranslateService);

  userEmail: string | null = localStorage.getItem('userEmail');

  resetForm!: FormGroup;
  loading = signal(false);

  ngOnInit() {
    this.resetForm = this.fb.group(
      {
        email: [this.userEmail, [Validators.required, Validators.email]],
        seed: ['', [Validators.required]],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
            ),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: matchPasswordValidator('password', 'confirmPassword') },
    );
  }

  onResetPass() {
    if (this.resetForm.invalid) {
      this.resetForm.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    console.log(this.resetForm.value);
    this.authService.onResetPass(this.resetForm.value).subscribe({
      next: (res) => {
        this.loading.set(false);
        this.messageService.add({
          severity: 'success',
          summary: this.translate.instant('COMMON.SUCCESS'),
          detail: res.message,
        });
      },
      error: (err) => {
        this.loading.set(false);
        this.messageService.add({
          severity: 'error',
          summary: this.translate.instant('COMMON.ERROR'),
          detail: err.error?.message ?? this.translate.instant('COMMON.SOMETHING_WENT_WRONG'),
        });
      },
      complete: () => {
        localStorage.removeItem('userEmail');
        this.router.navigate(['/auth/login']);
      },
    });
  }
  get form() {
    return this.resetForm.controls;
  }
}
