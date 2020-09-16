import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService
  ) {}

  // tslint:disable-next-line: typedef
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.auth.getToken() || 'null';
    const insertedToken = request.clone({
      setHeaders: {
        token: authToken
      }
    });
    return next.handle(insertedToken);
  }
}
