import { Component, computed, inject, signal } from '@angular/core';
import { isActive, RouterLink, RouterLinkActive } from '@angular/router';
import { RoleEnum } from '../../../../core/enum/role.enum';
import { AuthStoreService } from '../../../../features/auth/services/auth-store.service';
import { AuthService } from '../../../../features/auth/services/auth.service';

export interface NavItem {
  label: string;
  route: string;
  icon: {
    default: string;
    active: string;
  };
}

export const INSTRUCTOR_NAV_ITEMS: NavItem[] = [
  {
    label: 'Dashboard',
    route: '/dashboard/instructor',
    icon: {
      default: '/images/dashboard-icon.svg',
      active: '/images/dashboard-icon-white.svg',
    },
  },
  {
    label: 'Students',
    route: '/dashboard/instructor/students',
    icon: {
      default: '/images/groups-icon.svg',
      active: '/images/groups-icon-white.svg',
    },
  },
  {
    label: 'Quizzes',
    route: '/dashboard/instructor/quizzes',
    icon: {
      default: '/images/Quiz-icon.svg',
      active: '/images/Quiz-icon-white.svg',
    },
  },
  {
    label: 'Groups',
    route: '/dashboard/instructor/groups',
    icon: {
      default: '/images/groups-icon.svg',
      active: '/images/groups-icon-white.svg',
    },
  },
];

export const STUDENT_NAV_ITEMS: NavItem[] = [
  {
    label: 'Dashboard',
    route: '/dashboard/learner',
    icon: {
      default: '/images/dashboard-icon.svg',
      active: '/images/dashboard-icon-white.svg',
    },
  },
  {
    label: 'Quizzes',
    route: '/dashboard/learner/quizzes',
    icon: {
      default: '/images/Quiz-icon.svg',
      active: '/images/Quiz-icon-white.svg',
    },
  },
  {
    label: 'Results',
    route: '/dashboard/learner/results',
    icon: {
      default: '/images/Results-icon.svg',
      active: '/images/Results-icon-white.svg',
    },
  },
];
@Component({
  selector: 'app-navigation-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navigation-sidebar.html',
  styleUrl: './navigation-sidebar.scss',
})
export class NavigationSidebar {
  private authService = inject(AuthService);

  isCollapsed = signal(false);

  navItems = computed(() => {
    const role = this.authService.getRole();
    return role === RoleEnum.Instructor ? INSTRUCTOR_NAV_ITEMS : STUDENT_NAV_ITEMS;
  });

  toggleCollapse(): void {
    this.isCollapsed.update((v) => !v);
  }
}
