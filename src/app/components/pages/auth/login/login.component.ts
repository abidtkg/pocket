import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public getEmail = '';
  public getPassword = '';

  constructor(
    private auth: AuthService,
    private title: Title,
    private toaster: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Login - Admin');
    const loginStatus = this.auth.isLogin();
    if (loginStatus === true ){
      this.router.navigate(['/dashboard']);
    }
  }

  // tslint:disable-next-line: typedef
  login(){

    const info = {
      email: this.getEmail,
      password: this.getPassword
    };
    this.auth.login(info)
    .subscribe(data => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('name', data.name);
      this.toaster.success(`Logged as ${data.name}`);
      this.router.navigate(['/dashboard']);
    }, (error) => {
      console.log(error);
      this.toaster.error('Failed To Login');
    });
  }
}
