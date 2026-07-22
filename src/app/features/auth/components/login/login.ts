import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthLayout } from '../../../../shared/layouts/auth-layout/auth-layout';
import { FormField } from '../../../../shared/components/auth/form-field/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { RoleEnum } from '../../../../core/enum/role.enum';
@Component({
  selector: 'app-login',
  imports: [AuthLayout, FormField, Button, RouterLink, TranslatePipe, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly messageService = inject(MessageService);
  private translate = inject(TranslateService);
  form!: FormGroup;
  loading = signal(false);
  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.authService.onLogin(this.form.value).subscribe({
      next: (res) => {
        this.loading.set(false);
        this.messageService.add({
          severity: 'success',
          summary: this.translate.instant('common.success'),
          detail: res.message || this.translate.instant('auth.login_success_message'),
        });
        this.redirectByRole(res.data.profile.role);
      },
      error: (err) => {
        this.loading.set(false);
        this.messageService.add({
          severity: 'error',
          summary: this.translate.instant('common.error'),
          detail: err.error?.message || this.translate.instant('auth.login_failed_message'),
        });
      },
      complete: () => {},
    });

    console.log(this.form);
  }
  private redirectByRole(role: RoleEnum): void {
    const destination = role === RoleEnum.Instructor ? 'dashboard/instructor' : 'dashboard/learner';
    this.router.navigate([destination]);
  }
}
