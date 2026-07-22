import { Component, inject, signal } from '@angular/core';
import { AuthLayout } from '../../../../shared/layouts/auth-layout/auth-layout';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { matchPasswordValidator } from '../../../../shared/validators/confirm-password-validator';
import { MessageService } from 'primeng/api';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { FormField } from '../../../../shared/components/auth/form-field/form-field';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IReset, IResetResponse } from '../../interfaces/auth';
@Component({
  selector: 'app-change-password',
  imports: [AuthLayout, TranslatePipe, ReactiveFormsModule, FormField, ButtonModule],
  templateUrl: './change-password.html',
  styleUrl: './change-password.scss',
})
export class ChangePassword {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly messageService = inject(MessageService);
  private translate = inject(TranslateService);
  changePasswordForm!: FormGroup;
  loading = signal(false);

  ngOnInit() {
    this.changePasswordForm = this.fb.group(
      {
        password: ['', Validators.required], // Old Password
        password_new: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
            ),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: matchPasswordValidator('password_new', 'confirmPassword'),
      },
    );
  }

  get form() {
    return this.changePasswordForm.controls;
  }

  onChangePassword() {
    if (this.changePasswordForm.invalid) {
      this.changePasswordForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    this.authService
      .changePassword({
        password: this.changePasswordForm.value.password,
        password_new: this.changePasswordForm.value.password_new,
      })
      .subscribe({
        next: (res: IResetResponse) => {
          this.loading.set(false);

          this.messageService.add({
            severity: 'success',
            summary: this.translate.instant('common.success'),
            detail: res.message,
          });

          this.router.navigate(['/auth/login']);
        },
        error: (err) => {
          this.loading.set(false);

          this.messageService.add({
            severity: 'error',
            summary: this.translate.instant('common.error'),
            detail: err.error?.message,
          });
        },
      });
  }
}
