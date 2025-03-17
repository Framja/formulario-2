import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';
import { catchError, switchMap, tap, throwError } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const storage = environment.storage;
  const firebaseUrl = environment.firebase.databaseURL;
  const refreshTokenUrl = environment.urlRefreshToken;

  // Verifica se está rodando no navegador antes de acessar localStorage
  if (typeof window === 'undefined') {
    return next(req); // Se estiver no servidor, apenas passa a requisição adiante
  }

  if (req.url.includes(firebaseUrl)) {
    let token = localStorage.getItem(storage.framjaTokenAuth);
    let horarioExpiraToken = parseFloat(localStorage.getItem(storage.framjaExpiraToken) || '0');
    let horarioAtual = Date.now();

    if (horarioAtual < horarioExpiraToken) {
      const url = req.method === 'GET' && req.url.includes('?') ? `${req.url}&auth=${token}` : `${req.url}?auth=${token}`;
      const clonedRequest = req.clone({ url });

      return next(clonedRequest).pipe(
        catchError(error => {
          if (error.status === 401) {
            console.log('Erro 401: Token expirado. Atualizando token...');
            return authService.atualizarToken().pipe(
              switchMap(novoToken => {
                const newUrl = req.method === 'GET' && req.url.includes('?') ? `${req.url}&auth=${novoToken}` : `${req.url}?auth=${novoToken}`;
                return next(req.clone({ url: newUrl }));
              })
            );
          }
          return throwError(() => error);
        })
      );
    } else {
      console.log('Token expirado. Atualizando...');
      return authService.atualizarToken().pipe(
        tap(novoToken => token = novoToken),
        switchMap(novoToken => {
          const newUrl = req.method === 'GET' && req.url.includes('?') ? `${req.url}&auth=${novoToken}` : `${req.url}?auth=${novoToken}`;
          return next(req.clone({ url: newUrl }));
        })
      );
    }
  }

  if (req.url.includes(refreshTokenUrl)) {
    return next(req).pipe(
      catchError(error => {
        if (error.status === 400) {
          authService.logout();
        }
        return throwError(() => error);
      })
    );
  }

  return next(req);
};
