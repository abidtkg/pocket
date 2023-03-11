import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/dash/dashboard', pathMatch: 'full' },
  { path: 'auth',  loadChildren: () => import('./modules/auth/auth.module').then(x => x.AuthModule) },
  { path: 'dash', loadChildren: () => import('./modules/dashboard/dashboard.module').then(x => x.DashboardModule), canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
