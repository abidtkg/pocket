import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { ConfirmationComponent } from './dialogs/confirmation/confirmation.component';
import { MatDialogModule } from '@angular/material/dialog';
import { timeStampToDate } from './pipes/todatetime.pipe';
import { HelperService } from './services/helper.service';
import { thousandSeparetor } from './pipes/thousandseparetor.pipe';


@NgModule({
  declarations: [
    NavbarComponent,
    ConfirmationComponent,
    timeStampToDate,
    thousandSeparetor
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatDialogModule
  ],
  exports: [
    NavbarComponent,
    ConfirmationComponent,
    timeStampToDate,
    thousandSeparetor
  ],
  providers: [
    HelperService
  ]
})
export class SharedModule { }
