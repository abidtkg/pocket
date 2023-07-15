import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { CreateAccountComponent } from './shared/create-account/create-account.component';
import { UpdateAccountComponent } from './shared/update-account/update-account.component';
import { SharedModule } from '../shared/shared.module';
import { AccountService } from './services/account.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
    declarations: [
        AccountsComponent,
        CreateAccountComponent,
        UpdateAccountComponent
    ],
    imports: [
        CommonModule,
        AccountRoutingModule,
        SharedModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule,
        MatToolbarModule,
        MatDialogModule,
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        MatProgressBarModule
    ],
    providers: [
        AccountService
    ]
})
export class AccountModule { }
