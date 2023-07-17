import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICategoryRes, ICreateTransaction, ITransactionRes } from '../interfaces/transaction.interface';

@Injectable({
    providedIn: 'root'
})
export class TransactionService {

    private server: string = environment.server;
    
    constructor(
        private http: HttpClient
    ) { }

    transactions(skip: number, limit: number): Observable<ITransactionRes> {
        const searchPayload = {
            skip: skip * limit,
            limit: limit
        }

        return this.http.post<ITransactionRes>(`${this.server}/transaction/transactions`, searchPayload)
        .pipe(
            retry(1),
            catchError(this.errorHandeller)
        );
    }

    create(transaction: ICreateTransaction): Observable<any> {
        return this.http.post<any>(`${this.server}/transaction/create`, transaction)
        .pipe(
            retry(1),
            catchError(this.errorHandeller)
        );
    }

    delete(id: string): Observable<any> {
        return this.http.delete<any>(`${this.server}/transaction/delete/${id}`)
        .pipe(
            retry(1),
            catchError(this.errorHandeller)
        );
    }

    categories(skip: number, limit: number): Observable<ICategoryRes> {
        const nextSkip = skip * limit;
        return this.http.get<ICategoryRes>(`${this.server}/category/categories/${nextSkip}/${limit}`)
    }

    errorHandeller(error: HttpErrorResponse) {
        return throwError(() => error);
    }

}
