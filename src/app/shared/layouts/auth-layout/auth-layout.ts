import { Component,  input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterLink],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.scss',
})
export class AuthLayout {
   title = input('');
    iconsForLogin = input<{ icon: string; label: string; link: string }[]>([]);
}
