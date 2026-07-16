import { Component } from '@angular/core';
import { AuthLayout } from '../../../../shared/layouts/auth-layout/auth-layout';

@Component({
  selector: 'app-register',
  imports: [AuthLayout],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {}
