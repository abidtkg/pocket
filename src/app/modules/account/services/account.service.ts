import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { IAccountsResponse } from '../interfaces/account.interface';

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

    errorHandeller(error: HttpErrorResponse) {
        return throwError(() => error);
    }
}
