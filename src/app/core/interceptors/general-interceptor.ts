import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

export const generalInterceptor: HttpInterceptorFn = (request, next) => {
  const token = localStorage.getItem('HMSToken');

  if (request.url.includes('/i18n/')) {
    return next(request);
  }

  const modifiedRequest = request.clone({
    url: `${environment.apiUrl}${request.url}`,
    setHeaders: (token) ? { Authorization: `${token}` } : {}
  });
  return next(modifiedRequest);
};
