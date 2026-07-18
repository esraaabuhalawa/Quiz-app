import { Component, inject, OnInit } from '@angular/core';
import { AuthLayout } from '../../../../shared/layouts/auth-layout/auth-layout';
import { FormField } from '../../../../shared/components/auth/form-field/form-field';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Button } from 'primeng/button';
@Component({
  selector: 'app-login',
  imports: [AuthLayout, FormField, Button],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  private readonly fb = inject(FormBuilder);

  form!: FormGroup;
  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
          ),
        ],
      ],
    });
  }
}
