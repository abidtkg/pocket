import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/dash/dashboard', pathMatch: 'full' },
  { path: 'auth',  loadChildren: () => import('./modules/auth/auth.module').then(x => x.AuthModule) },
  { path: 'dash', loadChildren: () => import('./modules/dashboard/dashboard.module').then(x => x.DashboardModule), canActivate: [AuthGuard] },
  { path: 'transaction', loadChildren: () => import('./modules/transaction/transaction.module').then(x => x.TransactionModule), canActivate: [AuthGuard] },
  { path: 'account', loadChildren: () => import('./modules/account/account.module').then(x => x.AccountModule), canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
