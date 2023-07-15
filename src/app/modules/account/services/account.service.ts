import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { IAccountsResponse, IAccoutDetails, ICreateAccount } from '../interfaces/account.interface';

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    private server: string = environment.server;

    constructor(
        private http: HttpClient
    ) { }

    accounts(skip: number, limit: number): Observable<IAccountsResponse> {
        const nextSkip = skip * limit;
        return this.http.get<IAccountsResponse>(`${this.server}/account/accounts/${nextSkip}/${limit}`)
    }

    create(account: ICreateAccount): Observable<any> {
        return this.http.post<any>(`${this.server}/account/create`, account)
        .pipe(
            retry(1),
            catchError(this.errorHandeller)
        );
    }

    update(account: ICreateAccount, accountId: string): Observable<any> {
        return this.http.patch<any>(`${this.server}/account/update/${accountId}`, account)
        .pipe(
            retry(1),
            catchError(this.errorHandeller)
        );
    }

    find(accountId: string): Observable<IAccoutDetails> {
        return this.http.get<IAccoutDetails>(`${this.server}/account/findone/${accountId}`)
        .pipe(
            retry(1),
            catchError(this.errorHandeller)
        );
    }

    errorHandeller(error: HttpErrorResponse) {
        return throwError(() => error);
    }
}
