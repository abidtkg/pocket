import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { IAuth } from '../../Interfaces/Auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  private baseURL = 'https://jsengine.herokuapp.com';

  login(info: object): Observable<IAuth>{
    return this.http.post<IAuth>
    (`${this.baseURL}/auth/login`, info)
    .pipe(
      retry(1),
      catchError(this.errorHandeller)
    );
  }

  // tslint:disable-next-line: typedef
  isLogin(){
    return !!localStorage.getItem('token');
  }

  // tslint:disable-next-line: typedef
  getToken(){
    return localStorage.getItem('token');
  }
  // tslint:disable-next-line: typedef
  errorHandeller(error: HttpErrorResponse){
    return throwError(error);
  }
}
