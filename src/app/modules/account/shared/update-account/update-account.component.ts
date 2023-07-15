import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AccountService } from '../../services/account.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ICreateAccount } from '../../interfaces/account.interface';

@Component({
    selector: 'app-update-account',
    templateUrl: './update-account.component.html',
    styleUrls: ['./update-account.component.scss']
})
export class UpdateAccountComponent implements OnInit {
    
    public name: string = '';
    public number: string = '';
    public note: string = '';
    public isProcessing: boolean = false;

    constructor(
        public DialogRef: MatDialogRef<UpdateAccountComponent>,
        @Inject(MAT_DIALOG_DATA) public data: string,
        private Account: AccountService,
        private SnackBar: MatSnackBar
    ){}
    
    ngOnInit(): void {
        this.isProcessing = true;
        this.Account.find(this.data)
        .subscribe({
            next: (data) => {
                this.name = data.name;
                this.number = data.number;
                this.note = data.note;
                this.isProcessing = false;
            },
            error: (error) => {
                this.SnackBar.open(error.error.error, 'Close');
                this.isProcessing = false;
            }
        });
    }

    update(){
        if(!this.name){
            this.SnackBar.open('Account name required', 'Close');
            return ;
        }
        if(!this.number) {
            this.SnackBar.open('Account number required!', 'Close');
            return ;
        }

        const updateAccount: ICreateAccount = {
            name: this.name,
            number: this.number,
            note: this.note
        }

        this.isProcessing = true;
        this.Account.update(updateAccount, this.data)
        .subscribe({
            next: (data) => {
                this.SnackBar.open('Accout updated!', 'Close');
                this.isProcessing = false;
                this.DialogRef.close(true);
            },
            error: (error) => {
                this.SnackBar.open(error.error.error, 'Close');
                this.isProcessing = false;
            }
        });
    }

    close(){
        this.DialogRef.close(false);
    }
}
