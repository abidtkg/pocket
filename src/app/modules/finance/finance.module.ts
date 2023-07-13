import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanceRoutingModule } from './finance-routing.module';
import { DashComponent } from './pages/dash/dash.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { CreateTransactionComponent } from './shared/create-transaction/create-transaction.component';
import { CreateAccountComponent } from './shared/create-account/create-account.component';
import { UpdateAccountComponent } from './shared/update-account/update-account.component';


@NgModule({
  declarations: [
    DashComponent,
    TransactionsComponent,
    AccountsComponent,
    CreateTransactionComponent,
    CreateAccountComponent,
    UpdateAccountComponent
  ],
  imports: [
    CommonModule,
    FinanceRoutingModule
  ]
})
export class FinanceModule { }
