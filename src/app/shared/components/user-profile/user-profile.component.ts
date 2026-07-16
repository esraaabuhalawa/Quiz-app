import { Component, inject, OnInit } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../../features/auth/services/auth.service';
@Component({
  selector: 'app-user-profile',
  imports: [SkeletonModule, CommonModule, TranslatePipe],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  private readonly authservice = inject(AuthService);
  userInfo$ = this.authservice.currentUser$;

  loading = false;

  ngOnInit(): void {
    this.authservice.loadCurrentUser();
  }
}
