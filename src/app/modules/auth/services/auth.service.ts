import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable, retry, catchError } from 'rxjs';
import { ILogin, ILoginRes } from '../interfaces/auth.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }


  login(user: ILogin): Observable<ILoginRes> {
    return this.http.post<ILoginRes>(`${environment.server}/auth/login`, user)
    .pipe(
      retry(1),
      catchError(this.errorHandeller)
    );
  }

  errorHandeller(error: HttpErrorResponse) {
    return throwError(() => error);
  }
}
