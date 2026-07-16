import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private translate = inject(TranslateService);

  initializeLanguage() {
    const lang = localStorage.getItem('lang') || 'en';

    // Registers 'en' and 'ar' as known languages without loading them yet
    this.translate.addLangs?.(['en', 'ar']);

    this.translate.setFallbackLang('en');

    this.translate.use(lang).subscribe(() => {
      this.setDirection(lang);
    });
  }

  changeLanguage(lang: string) {
    this.translate.use(lang).subscribe(() => {
      localStorage.setItem('lang', lang);
      this.setDirection(lang);
    });
  }

  getCurrentLanguage(): string {
    return this.translate.currentLang() ?? 'en';
  }

  private setDirection(lang: string) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }
}
