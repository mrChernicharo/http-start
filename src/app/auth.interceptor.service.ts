import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators';


export class AuthInterceptorService implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {

    const modifiedRequest = request.clone({
      headers: request.headers.append('Auth', 'xyz123')
    })

    return next.handle(modifiedRequest).pipe(tap(event => {
      console.log(event)
      if (event.type === HttpEventType.Response) {
        console.log(`Response arrived. Response body`)
        console.log(event.body)
      }
    }))
  }
}
