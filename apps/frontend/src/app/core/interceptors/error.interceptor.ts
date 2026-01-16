import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, retry, throwError, timer } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);

  return next(req).pipe(
    // Retry once for network errors or 5xx, with a small delay
    retry({
      count: 1,
      delay: (error, retryCount) => {
        if (error.status >= 500 || error.status === 0) {
          return timer(retryCount * 500);
        }
        return throwError(() => error);
      },
    }),
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Ocorreu um erro inesperado.';
      let severity = 'error';

      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Erro: ${error.error.message}`;
      } else {
        // Server-side error
        if (error.status === 401) {
          errorMessage = 'Sessão expirada ou credenciais inválidas.';
          severity = 'warn';
        } else if (error.status === 403) {
          errorMessage = 'Você não tem permissão para realizar esta ação.';
        } else if (error.status === 404) {
          errorMessage = 'Recurso não encontrado.';
        } else if (error.status >= 500) {
          errorMessage =
            'Erro interno no servidor. Tente novamente mais tarde.';
        } else if (error.error && error.error.message) {
          // Backend returned a specific message
          errorMessage = Array.isArray(error.error.message)
            ? error.error.message.join(', ')
            : error.error.message;
        }
      }

      messageService.add({
        severity: severity as any,
        summary: 'Erro',
        detail: errorMessage,
        life: 5000,
      });

      return throwError(() => error);
    }),
  );
};
