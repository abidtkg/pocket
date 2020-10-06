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
import { EditinvoiceComponent } from './components/pages/edit/editinvoice/editinvoice.component';
import { ViewinvoiceComponent } from './components/pages/view/viewinvoice/viewinvoice.component';
import { InvoiceService } from './services/customar/invoice.service';
// import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
// import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LOADING_BAR_CONFIG } from '@ngx-loading-bar/core';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageerorComponent,
    FooterComponent,
    HeaderComponent,
    MainDashComponent,
    NewinvoiceComponent,
    EditinvoiceComponent,
    ViewinvoiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    CommonModule,
    ToastrModule.forRoot(),
    LoadingBarModule
  ],
  providers: [
    AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    AuthGuard,
    InvoiceService,
    { provide: LOADING_BAR_CONFIG, useValue: { latencyThreshold: 100 } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
