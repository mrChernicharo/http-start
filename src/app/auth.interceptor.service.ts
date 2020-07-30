import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';

export class AuthInterceptorService implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const modifiedRequest = request.clone({
      headers: request.headers.append('Auth', 'xyz123')
    })
    console.log('AuthInterceptor executed')
    return next.handle(modifiedRequest);
  }
}
