import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/dash/dashboard', pathMatch: 'full' },
  { path: 'auth',  loadChildren: () => import('./modules/auth/auth.module').then(x => x.AuthModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
