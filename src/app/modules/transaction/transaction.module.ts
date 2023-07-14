import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionRoutingModule } from './transaction-routing.module';
import { DashComponent } from './pages/dash/dash.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { CreateTransactionComponent } from './shared/create-transaction/create-transaction.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    DashComponent,
    TransactionsComponent,
    CreateTransactionComponent
  ],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    SharedModule
  ]
})
export class TransactionModule { }
