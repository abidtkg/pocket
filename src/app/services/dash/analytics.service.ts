import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  private baseURL = 'https://jsengine.herokuapp.com/analytics';
  constructor(
    private http: HttpClient
  ) { }

  oneYearView(): Observable<any>{
    return this.http.get(`${this.baseURL}/get/revenue/year`)
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
