import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, ReplaySubject, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../models/identity/IUser';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.apiURL + 'api/account/';
  private currentUserSource = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentUserSource.asObservable();
  constructor(private http: HttpClient) {}

  public login(model: any): Observable<void> {
    return this.http.post<IUser>(this.baseUrl + 'login', model).pipe(
      take(1),
      map((response: IUser) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
        }
      })
    );
  }
  public register(model: any): Observable<void> {
    return this.http.post<IUser>(this.baseUrl + 'register', model).pipe(
      take(1),
      map((response: IUser) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('user');
    this.currentUserSource.next(null!);
    this.currentUserSource.complete();
  }

  public setCurrentUser(user: IUser): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }
}
