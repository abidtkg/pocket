import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { CreateAccountComponent } from './shared/create-account/create-account.component';
import { UpdateAccountComponent } from './shared/update-account/update-account.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AccountsComponent,
    CreateAccountComponent,
    UpdateAccountComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule
  ]
})
export class AccountModule { }
