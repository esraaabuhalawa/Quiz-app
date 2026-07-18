import { Component, inject, signal } from '@angular/core';
import { AuthLayout } from '../../../../shared/layouts/auth-layout/auth-layout';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { SelectModule } from 'primeng/select';
import { Router } from '@angular/router';
import { IRegister } from '../../interfaces/auth';
import { MessageService } from 'primeng/api';
import { FormField } from '../../../../shared/components/auth/form-field/form-field';
@Component({
  selector: 'app-register',
  imports: [
    TranslatePipe,
    AuthLayout,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    SelectModule,
    FormField,
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);
  isLoading = signal(false);
  roleOptions = [
    { label: 'Student', value: 'Student' },
    { label: 'Instructor', value: 'Instructor' },
  ];

  signupForm = this.fb.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    role: ['', Validators.required],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&#]{8,}$/),
      ],
    ],
  });

  onSubmit(): void {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }
    this.isLoading.set(true);
    console.log(this.signupForm.value);

    const registerData = this.signupForm.getRawValue() as IRegister;

    this.authService.register(registerData).subscribe({
      next: (res) => {
        console.log(res);
        this.isLoading.set(false);
        this.messageService.add({
          severity: 'success',
          summary: 'Account Created',
          detail: res.message,
        });
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.message || 'Something went wrong',
        });
        this.isLoading.set(false);
      },
    });
  }

  navigateToLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}
