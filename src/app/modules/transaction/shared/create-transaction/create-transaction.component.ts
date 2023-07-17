import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { ICategory, ICreateTransaction } from '../../interfaces/transaction.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IAccountList } from 'src/app/modules/account/interfaces/account.interface';
import { AccountService } from 'src/app/modules/account/services/account.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-create-transaction',
    templateUrl: './create-transaction.component.html',
    styleUrls: ['./create-transaction.component.scss']
})
export class CreateTransactionComponent implements OnInit {

    public particular: string = '';
    public transactionId: string = '';
    public categoryId: string = '';
    public note: string = '';
    public type: string = '';
    public amount: number = 0;
    public accountId: string = '';
    public currency: string = '';

    // RELATIONAL DATA
    public categories: ICategory[] = [];
    public accounts: IAccountList[] = [];
    public isProcessing: boolean = false;

    constructor(
        private Transaction: TransactionService,
        private SnackBar: MatSnackBar,
        private Account: AccountService,
        public dialogRef: MatDialogRef<CreateTransactionComponent>,
    ){}

    ngOnInit(): void {
        this.isProcessing = true;
        this.Transaction.categories(0, 100)
        .subscribe({
            next: (data) => {
                this.categories = data.categories;
            },
            error: (error) => {
                this.SnackBar.open(error.error.error, 'Close');
            }
        });

        this.Account.accounts(0, 100)
        .subscribe({
            next: (data) => {
                this.accounts = data.accounts;
                this.isProcessing = false;
            },
            error: (error) => {
                this.SnackBar.open(error.error.error, 'Close');
                this.isProcessing = false;
            }
        });

    }


    create(){
        const transaction: ICreateTransaction = {
            transactionId: this.transactionId,
            categoryId: this.categoryId,
            particular: this.particular,
            note: this.note,
            type: this.type,
            amount: +this.amount,
            accountId: this.accountId,
            currency: this.currency
        }

        this.isProcessing = true;
        this.Transaction.create(transaction)
        .subscribe({
            next: (data) => {
                this.SnackBar.open('Transaction created!', 'Close');
                this.dialogRef.close(true);
            },
            error: (error) => {
                this.SnackBar.open(error.error.error, 'Close');
                this.isProcessing = false;
            }
        });
    }

    close(){
        this.dialogRef.close(false);
    }
}
