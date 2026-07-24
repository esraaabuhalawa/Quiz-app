import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AuthService } from '../../../../features/auth/services/auth.service';
import { Button } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { filter } from 'rxjs';
import { LanguageSwitcherComponent } from "../../../components/language-switcher/language-switcher.component";
@Component({
  selector: 'app-nav-bar',
  imports: [BadgeModule, AvatarModule, InputTextModule, CommonModule, Button, MenuModule, LanguageSwitcherComponent],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
})
export class NavBar implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  pageTitle = signal('Dashboard');

  userName = computed(() => this.authService.getCurrentUser()?.first_name ?? '');
  userRole = computed(() => this.authService.getCurrentUser()?.role ?? '');
  userInitials = computed(() => this.userName().charAt(0).toUpperCase());
  ngOnInit(): void {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      let route = this.activatedRoute;

      while (route.firstChild) {
        route = route.firstChild;
      }

      this.pageTitle.set(route.snapshot.data['title'] ?? 'Dashboard');
    });
  }
  userMenuItems: MenuItem[] = [
    { label: 'Profile', icon: 'pi pi-user' },
    { label: 'Logout', icon: 'pi pi-sign-out', command: () => this.authService.logout() },
  ];

  onNewQuiz(): void {
    this.router.navigate(['/instructor/add-quiz'], { relativeTo: this.activatedRoute });
  }
}
