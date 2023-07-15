import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { map, merge, startWith, switchMap } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { IAccountList } from '../../interfaces/account.interface';
import { AccountService } from '../../services/account.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateAccountComponent } from '../../shared/create-account/create-account.component';
import { UpdateAccountComponent } from '../../shared/update-account/update-account.component';

@Component({
    selector: 'app-accounts',
    templateUrl: './accounts.component.html',
    styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements AfterViewInit {
    
    public tableCols: string[] = ['name', 'balance', 'updated',  'date','action'];
    public data: IAccountList[] = [];
    public dataLimit: number = 10;
    public resultsLength = 0;
    public isLoadingResults = true;
    public isRateLimitReached = false;
    
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    
    constructor(
        private Account: AccountService,
        private Dialog: MatDialog
    ){}
    
    ngAfterViewInit() {
        this.paginator.pageIndex = 0;
        
        merge(this.paginator.page)
        .pipe(
            startWith({}),
            switchMap(() => {
                this.isLoadingResults = true;
                return this.Account!.accounts(
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
                this.resultsLength = data.totalAccounts;
                return data.accounts;
            }),
        )
        .subscribe(data => (this.data = data));
    }
    
    handlePageEvent(event: any){
        this.dataLimit = event.pageSize;
    }
    
    reloadData(){
        this.Account.accounts(this.paginator.pageIndex, this.dataLimit)
        .subscribe({
            next: (data) => {
                this.data = data.accounts;
                this.resultsLength = data.totalAccounts;
            }
        });
    }
    
    delete(id: string){
        
    }

    create(){
        const dialogRef = this.Dialog.open(CreateAccountComponent, {
            disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
            if(result == true){
                this.reloadData();
            }
        });
    }

    update(accountId: string) {
        const dialogRef = this.Dialog.open(UpdateAccountComponent, {
            disableClose: true,
            data: accountId
        });

        dialogRef.afterClosed().subscribe(result => {
            if(result == true) {
                this.reloadData();
            }
        })
    }
}
