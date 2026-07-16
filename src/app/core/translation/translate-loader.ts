import { HttpClient } from '@angular/common/http';
import { Injectable, makeStateKey, TransferState } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslateUniversalLoader implements TranslateLoader {
  private prefix: string = '/i18n/';
  private suffix: string = '.json'
  constructor(
    private http: HttpClient,
    private transferState: TransferState,
  ) { }

  getTranslation(lang: string): Observable<any> {
    const key = makeStateKey<any>(`translation-${lang}`);
    const storedTranslations = this.transferState.get(key, null);

    if (storedTranslations) {
      // Use cached translations from server
      return of(storedTranslations);
    }

    return this.http.get(`${this.prefix}${lang}${this.suffix}`).pipe(
      tap((translations) => {
        // Cache translations for client
        this.transferState.set(key, translations);
      })
    );
  }
}

export function translateLoaderFactory(
  http: HttpClient,
  transferState: TransferState
) {
  return new TranslateUniversalLoader(http, transferState);
}
