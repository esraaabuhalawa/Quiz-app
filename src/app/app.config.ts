import {
  ApplicationConfig,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  TransferState,
} from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling } from '@angular/router';
import { MessageService } from 'primeng/api';

import { providePrimeNG } from 'primeng/config';

import { routes } from './app.routes';
import { QuizPreset } from './core/theme/QuizPreset';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { generalInterceptor } from './core/interceptors/general-interceptor';
import { environment } from '../environments/environment';
import { errorInterceptor } from './core/interceptors/error-interceptor';

import { TranslateLoader, provideTranslateService } from '@ngx-translate/core';
import { translateLoaderFactory } from './core/translation/translate-loader';
import { initializeSession } from './features/auth/services/initialize-session';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      // withHashLocation(),
      withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
    ),

    provideHttpClient(withInterceptors([generalInterceptor, errorInterceptor])),
    MessageService,
    provideTranslateService({
      fallbackLang: 'en',
      lang: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: translateLoaderFactory,
        deps: [HttpClient, TransferState],
      },
    }),
    providePrimeNG({
      theme: {
        preset: QuizPreset,
        options: {
          prefix: 'p',
          darkModeSelector: '.dark',
          cssLayer: false,
        },
      },
    }),
    provideAppInitializer(() => initializeSession()),
  ],
};
