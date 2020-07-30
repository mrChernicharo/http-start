import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class LogginIntercpetorService implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    console.log('OutgoingRequest')
    return next.handle(request).pipe(
      tap(event => {
        if (event.type === HttpEventType.Response) {
          console.log('Incoming Response');
          console.log(event.status)
          console.log(event.body)
        }
      })
    );
  }
}
