import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable, catchError } from 'rxjs';
import { ILogin, ILoginRes, IUserRegister } from '../interfaces/auth.interface';
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
            catchError(this.errorHandeller)
        );
    }

    register(user: IUserRegister): Observable<{token: string}> {
        return this.http.post<{token: string}>(`${environment.server}/auth/create`, user)
        .pipe(
            catchError(this.errorHandeller)
        );
    }

    errorHandeller(error: HttpErrorResponse) {
        return throwError(() => error);
    }
}
