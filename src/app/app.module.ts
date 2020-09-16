import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/pages/auth/login/login.component';
import { PageerorComponent } from './components/pages/error/pageeror/pageeror.component';
import { AuthService } from './services/auth/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { HeaderComponent } from './components/layouts/header/header.component';
import { MainDashComponent } from './components/pages/dash/main-dash/main-dash.component';
import { NewinvoiceComponent } from './components/pages/create/newinvoice/newinvoice.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageerorComponent,
    FooterComponent,
    HeaderComponent,
    MainDashComponent,
    NewinvoiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    CommonModule,
    ToastrModule.forRoot()
  ],
  providers: [AuthService, {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
