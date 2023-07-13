import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../modules/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor(
    private Auth: AuthService,
    private Router: Router 
  ){}
  canActivate(): boolean {
    if (!!localStorage.getItem('token')){
      return true;
    }else{
      this.Router.navigate(['/auth/login']);
      return false;
    }
  }
  
}