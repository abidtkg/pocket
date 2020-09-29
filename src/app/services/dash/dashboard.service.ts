import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private http: HttpClient
  ) { }

  private baseURL = 'https://jsengine.herokuapp.com/dashboard';
  dashData(): Observable<any>{
    return this.http.get<any>(`${this.baseURL}/overview`)
    .pipe(
      retry(1),
      catchError(this.errorHandeller)
    );
  }

  // tslint:disable-next-line: typedef
  errorHandeller(error: HttpErrorResponse){
    return throwError(error);
  }
}
