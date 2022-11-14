import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('token');;
    // Clone the request to add the new header.
    
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `${token}`),

    });
    next.handle(req);
    
    // console.log('Sending request with new header now ...');

    //send the newly created request
    return next.handle(authReq).pipe(
      catchError(err => {
        console.log('Error Occurred');
        console.log("err,", err.error.message);
 
        // this.toastrService.error("error",err.error.message);
        throw new Error();
      })) as any;


  }
}
{
}


