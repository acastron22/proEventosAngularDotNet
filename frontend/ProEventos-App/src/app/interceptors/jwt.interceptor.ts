import { AccountService } from './../services/account.service';
import { IUser } from './../models/identity/IUser';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, catchError, take, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private accountService: AccountService, private router:Router) { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let currentUser: IUser;
    this.accountService.currentUser$.pipe(take(1)).subscribe((user) => {
      currentUser = user;
      console.log(currentUser.token);
      if (currentUser) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        });
      }
    });

    return next.handle(request).pipe(
      catchError((error) => {
        if (error) {
          localStorage.removeItem('user');
          // alert('Conexão Expirada. Por favor, faça o login novamente');
          // this.router.navigate(['/user/login']);
        }
        return throwError(error);
      })
    );
  }
}
