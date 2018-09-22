import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {AuthService} from '../service/auth.service';
import {Observable, of} from 'rxjs';
import {Router} from "@angular/router";
import {catchError} from "rxjs/internal/operators";

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private router:Router) { }

  
 intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  //  if (localStorage.getItem('jwtToken')) {
  //    request = request.clone({
  //      setHeaders: {
  //        Authorization: `Bearer ` + localStorage.getItem('jwtToken')
  //      }
  //    });
  //  }

   /**
    * continues request execution
    */
   return next.handle(request).pipe(catchError((error, caught) => {
       //intercept the respons error and displace it to the console
      // console.log("erroor",error);
       this.handleAuthError(error);
       return of(error);
     }) as any);
 }


 /**
  * manage errors
  * @param err
  * @returns {any}
  */
 private handleAuthError(err: HttpErrorResponse): Observable<any> {
  console.log('handled error ' + err.status);
   //handle your auth error or rethrow
   this.router.navigate([`/login`]);
   if (err.status === 401) {
     //navigate /delete cookies or whatever
     console.log('handled error ' + err.status);
     this.router.navigate([`/login`]);
     // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
     return of(err.message);
   }
   throw err;
 }
}
