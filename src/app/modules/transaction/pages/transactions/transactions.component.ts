import { Component, ViewChild } from '@angular/core';
import { ITransaction } from '../../interfaces/transaction.interface';
import { MatPaginator } from '@angular/material/paginator';
import { TransactionService } from '../../services/transaction.service';
import { MatDialog } from '@angular/material/dialog';
import { merge, startWith, switchMap, map } from 'rxjs';
import { ConfirmationComponent } from 'src/app/modules/shared/dialogs/confirmation/confirmation.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateTransactionComponent } from '../../shared/create-transaction/create-transaction.component';


@Component({
    selector: 'app-transactions',
    templateUrl: './transactions.component.html',
    styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent {
    public tableCols: string[] = ['particular', 'amount', 'category', 'date', 'action'];
    public data: ITransaction[] = [];
    public dataLimit: number = 10;
    public resultsLength = 0;
    public isLoadingResults = true;
    public isRateLimitReached = false;
    
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    
    constructor(
        private Transaction: TransactionService,
        private Dialog: MatDialog,
        private SnackBar: MatSnackBar
    ){}
    
    ngAfterViewInit() {
        this.paginator.pageIndex = 0;
        
        merge(this.paginator.page)
        .pipe(
            startWith({}),
            switchMap(() => {
                this.isLoadingResults = true;
                return this.Transaction!.transactions(
                    this.paginator.pageIndex,
                    this.dataLimit
                );
            }),
            map(data => {
                // Flip flag to show that loading has finished.
                this.isLoadingResults = false;
                this.isRateLimitReached = data === null;
                if (data === null) {
                    return [];
                }
                this.resultsLength = data.totalTransactions;
                return data.transactions;
            }),
        )
        .subscribe(data => (this.data = data));
    }
    
    handlePageEvent(event: any){
        this.dataLimit = event.pageSize;
    }
    
    reloadData(){
        this.Transaction.transactions(this.paginator.pageIndex, this.dataLimit)
        .subscribe({
            next: (data) => {
                this.data = data.transactions;
                this.resultsLength = data.totalTransactions;
            }
        });
    }
    
    delete(id: string){
        const dialogRef = this.Dialog.open(ConfirmationComponent, {
            disableClose: true,
            data: { message: 'Are you sure you want to delete the transaction?' }
        });

        dialogRef.afterClosed().subscribe(result => {
            if(result == true){
                this.Transaction.delete(id)
                .subscribe({
                    next: (data) => {
                        this.SnackBar.open('Transaction Deleted!', 'Close');
                        this.reloadData();
                    },
                    error: (error) => {
                        this.SnackBar.open(error.error.error, 'Close');
                    }
                });
            }
        });
    }

    create(){
        const dialogRef = this.Dialog.open(CreateTransactionComponent, {
            disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
            if(result == true){
                this.reloadData();
            }
        });
    }

    update(accountId: string) {
        // const dialogRef = this.Dialog.open(UpdateAccountComponent, {
        //     disableClose: true,
        //     data: accountId
        // });

        // dialogRef.afterClosed().subscribe(result => {
        //     if(result == true) {
        //         this.reloadData();
        //     }
        // })
    }
}
