import { Component, inject, Type } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavigationSidebar } from './navigation-sidebar/navigation-sidebar';
import { NavBar } from './nav-bar/nav-bar';

interface SidebarLinksModel {
  id: number;
  name: string;
  url: string;
  iconPath?: Type<any>;
  imgUrl?: string;
}
@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterOutlet, NavigationSidebar, NavBar],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.scss',
})
export class DashboardLayout {
  router = inject(Router);
  isSidebarVisible = false;
  userRole!: string;
  private mediaQuery?: MediaQueryList;
  private mediaQueryListener?: (event: MediaQueryListEvent) => void;
  private readonly mobileBreakpoint = 768;
  private readonly adminEmails = new Set(['admin@qeema.net']);
  toggleSidebar(event: boolean) {
    this.isSidebarVisible = event;
  }
  ngAfterViewInit(): void {
    this.mediaQuery = window.matchMedia(`(min-width: ${this.mobileBreakpoint}px)`);
    this.mediaQueryListener = (event: MediaQueryListEvent) => {
      if (event.matches) {
        this.isSidebarVisible = true;
      }
    };
    this.mediaQuery.addEventListener('change', this.mediaQueryListener);
  }
  ngOnInit(): void {
    this.navItems = this.buildNavItems();
    this.isSidebarVisible = window.innerWidth > this.mobileBreakpoint;

    this.userRole = localStorage.getItem('userType') || '';
  }

  ngOnDestroy(): void {
    if (this.mediaQuery && this.mediaQueryListener) {
      this.mediaQuery.removeEventListener('change', this.mediaQueryListener);
    }
  }

  navItems: SidebarLinksModel[] = [];

  private buildNavItems(): SidebarLinksModel[] {
    const links: SidebarLinksModel[] = [];
    const role = localStorage.getItem('userType') || '';
    console.log('User Role:', role);
    console.log('Is Admin Email:', this.isAdminEmail());
    if (role === 'app_admin' || role === 'components_admin') {
      links.push(
        {
          id: 2,
          name: 'OPEN API Standard',
          url: 'api-standard-list',
        },
        {
          id: 3,
          name: 'User management',
          url: 'user-management',
        },
        {
          id: 4,
          name: 'Repository',
          url: 'repository',
        },

        // {
        //   id: 4,
        //   name: 'Settings',
        //   url: 'settings',
        //   iconPath: SettingsIconComponent,
        // }
      );
    } else {
      links.push(
        {
          id: 0,
          name: 'API test',
          url: 'api-test',
        },
        {
          id: 1,
          name: 'Test history',
          url: 'api-history',
        },
        // {
        //   id: 2,
        //   name: 'OPEN API Standard',
        //   url: 'api-standard-list',
        //   iconPath: SecurityIconComponent,
        //   imgUrl: 'assets/icons/security-icon.svg',
        // },
        // {
        //   id: 3,
        //   name: 'Activity Monitoring',
        //   url: 'activity-monitoring',
        //   iconPath: PresentionIconComponent,
        //   imgUrl: 'assets/icons/presention-icon.svg',
        // },
        // {
        //   id: 4,
        //   name: 'User management',
        //   url: 'user-management',
        //   iconPath: PresentionIconComponent,
        //   imgUrl: 'assets/icons/presention-icon.svg',
        // },
        // {
        //   id: 5,
        //   name: 'Ai Assistant',
        //   url: 'https://mso-dev.tools.qeema.io/',
        //   iconPath: AiAssistantIconComponent,
        //   imgUrl: 'assets/icons/ai-assistant.svg',
        // },
      );
    }

    return links;
  }

  private isAdminEmail(): boolean {
    const userEmail = localStorage.getItem('userEmail')?.trim().toLowerCase() ?? '';
    return this.adminEmails.has(userEmail);
  }

  onNotification() {
    console.log('Notification icon clicked!');
  }

  onLogout() {
    console.log('Logout clicked!');
  }
}
