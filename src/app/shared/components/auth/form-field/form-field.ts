import { Component, Input } from '@angular/core';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { TranslatePipe } from '@ngx-translate/core';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [
    InputIconModule,IconFieldModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    TranslatePipe
  ],
   styleUrl: './form-field.scss',
  templateUrl: './form-field.html',
})
export class FormField {
  @Input({ required: true }) control!: AbstractControl | null;
  @Input() icon: string = '';
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type: 'text' | 'email' | 'password' = 'text';

  @Input() errorMessages: Record<string, string> = {};

  @Input() customError = false;
  @Input() customErrorMessage = '';

  @Input() autocomplete = 'off';

  get showError(): boolean {
    return !!(
      this.control &&
      this.control.invalid &&
      (this.control.touched || this.control.dirty)
    );
  }

  get firstError(): string | null {
    if (!this.control?.errors) {
      return null;
    }

    for (const key of Object.keys(this.errorMessages)) {
      if (this.control.errors[key]) {
        return this.errorMessages[key];
      }
    }

    return null;
  }
}
