import { HttpHeaders, HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from  '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


    private setHeaders(access_token, provider) {
      return;
    }

    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {
        return ;
    }
}
