import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

export class AuthInterceptorService implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {

    setTimeout(() => console.log('Request on it\'s way!'), 2000)
    return next.handle(request);
  }
}
