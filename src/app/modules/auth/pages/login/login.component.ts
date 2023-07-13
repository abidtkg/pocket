import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { ILogin } from '../../interfaces/auth.interface';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public appName: string = environment.appName;
  public isProcessing: boolean = false;
  public email: string = '';
  public password: string = '';

  constructor(
    private Title: Title,
    private Auth: AuthService,
    private SnackBar: MatSnackBar,
    private Router: Router
  ){}

  ngOnInit(): void {
    this.Title.setTitle(`Login - ${environment.appName}`);
  }


  login(){
    const user: ILogin = {
      email: this.email,
      password: this.password
    }

    this.isProcessing = true;
    this.Auth.login(user)
    .subscribe({
      next: (data) => {
        this.SnackBar.open('Logged In', 'Close');
        localStorage.setItem('token', data.token);
        this.Router.navigate(['/dash/dashboard']);
        this.isProcessing = false;
      },
      error: (error) => {
        this.SnackBar.open(error.error.error, 'Close');
        this.isProcessing = false;
      }
    });
  }

  forgetPassword(){
    this.SnackBar.open('Under development', 'Close');
  }

}
