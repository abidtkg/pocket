import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { IInvoice } from '../../Interfaces/Invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(
    private http: HttpClient
  ) { }

  private baseURL = 'https://jsengine.herokuapp.com/invoice';

  get(skip: number, count: number): Observable<IInvoice>{
    return this.http.get<IInvoice>(`${this.baseURL}/get/list/${skip}/${count}`)
    .pipe(
      retry(1),
      catchError(this.errorHandeller)
    );
  }

  single(invoice: string): Observable<IInvoice>{
    return this.http.get<IInvoice>
    (`${this.baseURL}/get/single/${invoice}`)
    .pipe(
      retry(1),
      catchError(this.errorHandeller)
    );
  }

  create(invoice: object): Observable<IInvoice>{
    return this.http.post<IInvoice>(`${this.baseURL}/create`, invoice)
    .pipe(
      retry(1),
      catchError(this.errorHandeller)
    );
  }

  update(id: string, invoice: object): Observable<IInvoice>{
    return this.http.put<IInvoice>
    (`${this.baseURL}/edit/${id}`, invoice)
    .pipe(
      retry(1),
      catchError(this.errorHandeller)
    );
  }

  delete(invoice: string): Observable<any>{
    return this.http.delete(`${this.baseURL}/delete/${invoice}`)
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
