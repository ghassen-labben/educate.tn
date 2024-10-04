import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import { KeycloakService } from 'keycloak-angular';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private keycloakService: KeycloakService) {}

  // @ts-ignore
  async intercept(req: HttpRequest<any>, next: HttpHandler): Promise<Observable<HttpEvent<any>>> {
    return await this.keycloakService.getToken().then(token => {
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(clonedRequest).pipe(
        catchError(err => {
          if (err.status === 401 || err.status === 403) {
            this.keycloakService.logout();
          }
          return throwError(err);
        })
      );    });

  }
}
