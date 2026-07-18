import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { inject } from '@angular/core';
import { TokenService } from '../../features/auth/services/token.service';

export const generalInterceptor: HttpInterceptorFn = (request, next) => {
  const tokenService = inject(TokenService);
  const token = tokenService.getToken();

  if (request.url.includes('/i18n/')) {
    return next(request);
  }

  const modifiedRequest = request.clone({
    url: `${environment.apiUrl}${request.url}`,
    // setHeaders: token ? { Authorization: `${token}` } : {},
    setHeaders: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return next(modifiedRequest);
};
