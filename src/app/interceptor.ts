import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  authReq: any
  constructor(public router: Router) { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    debugger;
    let token1: any = localStorage.getItem('token');
    const token: any = atob(token1);
    let toekn: any = localStorage.getItem('antiforgerytoken');
    const antitoken = atob(toekn);

    const cookietoken = localStorage.getItem('cookietoken');


    // Clone the request to add the new header.
    // debugger;

    // const headers = new HttpHeaders({
    //   'Authorization': `${token}`,
    //   'XSRF-TOKEN': `${token}`,
    //   'Cookie': 'xsrf-token=' + `${token}`,
    // });


    if (req.url.includes('GetMyDetailsForLogin') == true) {
      this.authReq = req.clone({
        headers: req.headers.set('Authorization', `${token}`),
      })
    } else if (req.url == 'https://asticom.digiofficeapp.com/AsticomMainAPI/Announcement/Authenicate') {
      this.authReq = req.clone({

      })
    }
    else {
      this.authReq = req.clone({
        setHeaders: {
          // 'Content-Type': 'application/json; charset=utf-8',
          'Accept': '*/*',
          //'Authorization': `${token}`,
          'XSRF-TOKEN': `${antitoken}`,
        },
        'withCredentials': true

      });
    }

    // const authReq = req.clone({

    //   headers: req.headers.set('Authorization', `${token}`),



    // });

    // debugger;
    next.handle(req);
    debugger;
    // console.log('Sending request with new header now ...');

    //send the newly created request
    return next.handle(this.authReq).pipe(
      catchError(err => {
        console.log('Error Occurred');
        console.log(err);
        // if (err.status === 400) {
        //   Swal.fire('Session is Expired. Please Login Again');
        //   localStorage.setItem('roledid', "0");
        //   this.router.navigate(['/Login']).then(() => {
        //     localStorage.clear();
        //     sessionStorage.clear();
        //     location.reload();

        //   })

        // }
        throw new Error(err);
      })) as any

  }
}
