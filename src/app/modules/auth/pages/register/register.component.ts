import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { IUserRegister } from '../../interfaces/auth.interface';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    public appName: string = environment.appName;
    public isProcessing: boolean = false;

    public name: string = '';
    public email: string = '';
    public password: string = '';

    constructor(
        private Title: Title,
        private Auth: AuthService,
        private SnackBar: MatSnackBar,
        private Router: Router
    ){}
    
    ngOnInit(): void {
        this.Title.setTitle(`Register Account - ${this.appName}`);
    }

    register(){
        this.isProcessing = true;
        const user: IUserRegister = {
            email: this.email,
            name: this.name,
            password: this.password
        }

        this.Auth.register(user)
        .subscribe({
            next: (data) => {
                this.isProcessing = false;
                localStorage.setItem('pocket_token', data.token);
                this.SnackBar.open('Register success and logged in!', 'Close');
                this.Router.navigate(['/dash/dashboard'])
            },
            error: (error) => {
                this.isProcessing = false;
                this.SnackBar.open(error.error.error, 'Close');
            }
        });
    }
}
