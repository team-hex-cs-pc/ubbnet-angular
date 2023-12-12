import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserService } from 'src/services/user.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiHttpInterceptor implements HttpInterceptor {
  private authToken: string | null = null;

  constructor(private userService: UserService) {
    userService.authToken$.subscribe((token) => {
      this.authToken = token;
    });
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let newHeaders;
    if (this.authToken) {
      newHeaders = req.headers.append(
        'Authorization',
        `Bearer ${this.authToken}`
      );
    }
    const newReq = req.clone({
      url: environment.apiUrl + req.url,
      headers: newHeaders,
    });
    return next.handle(newReq);
  }
}
