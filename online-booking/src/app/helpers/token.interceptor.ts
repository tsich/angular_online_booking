import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { AuthenticationService } from './../_services/authentication.service';

@Injectable()
// In this file we will intercept all requests and add the token in the authorization header automatically
export class TokenInterceptor implements HttpInterceptor {
  constructor(public authenticationService: AuthenticationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log(request);
    if (this.authenticationService.isLoggedIn()) {
      // we clone the original request with a new Authorization header
      // if user is logged, if not we just pass the original request
      let newRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authenticationService.getToken()}`,
        },
      });

      return next.handle(newRequest);
    }
    return next.handle(request);
  }
}
