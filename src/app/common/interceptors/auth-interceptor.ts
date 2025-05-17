import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, tap, throwError } from "rxjs";
import { ServiceLocator } from "../serviceLocator";
import { Store } from "@ngrx/store";
import { AppStates, getBearerToken } from "../../store/app-state";
import { Router } from "@angular/router";

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     console.log(req.url);
//   return next(req);
//   }
//   private addHeaders(req: HttpRequest<any>): HttpRequest<any> {
//     return req;
//   }
// }

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const router = ServiceLocator.injector.get(Router);
  if (!req.url.includes("login") || !req.url.includes("register")) {
    const bearerToken = localStorage.getItem("BearerToken");
    const cloneRequest = req.clone({
      headers: req.headers.set("Authorization", "Bearer " + bearerToken)
    });
    return next(cloneRequest).pipe(
      tap((event) => {
      if (event.type === HttpEventType.Response) {
        console.log(req.url, 'returned a response with status', event.status);
      }
    }),
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        localStorage.removeItem("BearerToken");
        router.navigate(['/login']);
      }
      return throwError(() => error);
    }))

  } else {
    return next(req);
  }
}
