import { Component } from '@angular/core';
import { ICreateAccount } from '../../interfaces/account.interface';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent {

  public name: string = '';
  public number: string = '';
  public note: string = '';
  public isProcessing: boolean = false;

  constructor(
    private DialogRef: MatDialogRef<CreateAccountComponent>,
    private SnackBar: MatSnackBar,
    private Account: AccountService
  ){}

  create(){
    if(!this.name) {
      this.SnackBar.open('Account name required!', 'Close');
      return ;
    }
    if(!this.number){
      this.SnackBar.open('Account number required!', 'Close');
      return ;
    }

    const account: ICreateAccount = {
      name: this.name,
      number: this.number,
      note: this.note
    }

    this.isProcessing = true;
    this.Account.create(account)
    .subscribe({
      next: (data) => {
        this.SnackBar.open('Account Created', 'Close');
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
