import { Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  private isMobile = new BehaviorSubject<boolean>(false);
  private isMobileOpen = new BehaviorSubject<boolean>(false);

  isMobile$ = this.isMobile.asObservable();
  isMobileOpen$ = this.isMobileOpen.asObservable();

  constructor() {
    //set initial value
    this.setMobile(window.innerWidth <= 992);

    fromEvent(window, 'resize')
      .pipe(debounceTime(100))
      .subscribe(() => {
        this.setMobile(window.innerWidth <= 992);
      });
  }

  setMobile(value: boolean) {
    this.isMobile.next(value);
    this.isMobileOpen.next(false);
  }

  closeMobileMenu() {
    this.isMobileOpen.next(false);
  }

  toggleSidebar() {
    if (this.isMobile.value) {
      this.isMobileOpen.next(!this.isMobileOpen.value);
    }
  }
}
