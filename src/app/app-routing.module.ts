import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/pages/auth/login/login.component';
import { NewinvoiceComponent } from './components/pages/create/newinvoice/newinvoice.component';
import { MainDashComponent } from './components/pages/dash/main-dash/main-dash.component';
import { PageerorComponent } from './components/pages/error/pageeror/pageeror.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: MainDashComponent, canActivate: [AuthGuard] },
  { path: 'invoice/create', component: NewinvoiceComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageerorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
