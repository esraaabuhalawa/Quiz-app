import { Component,  input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.scss',
})
export class AuthLayout {
   title = input('');
    iconsForLogin = input<{ icon: string; label: string; link: string }[]>([]);
}
