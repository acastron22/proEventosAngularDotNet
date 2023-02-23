import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, ReplaySubject, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../models/identity/IUser';
import { IUserUpdate } from '../models/identity/iuser-update';

@Injectable()
export class AccountService {
  private currentUserSource = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentUserSource.asObservable();

  baseUrl = environment.apiURL + 'api/account/';
  constructor(private http: HttpClient) {}

  login(model: any): Observable<void> {
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

  getUser(): Observable<IUserUpdate> {
    return this.http.get<IUserUpdate>(this.baseUrl + 'getUser').pipe(take(1));
  }

  updateUser(model: IUserUpdate): Observable<void> {
    return this.http.put<IUserUpdate>(this.baseUrl + 'updateUser', model).pipe(
      take(1),
      map((user: IUserUpdate) => {
        this.setCurrentUser(user);
      })
    );
  }

  register(model: any): Observable<void> {
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

  setCurrentUser(user: IUser): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  postUpload(file: File): Observable<IUserUpdate> {
    const fileToUpload = file[0] as File;
    const formData = new FormData();
    formData.append('file', fileToUpload);

    return this.http
      .post<IUserUpdate>(`${this.baseUrl}upload-image`, formData)
      .pipe(take(1));
  }
}
