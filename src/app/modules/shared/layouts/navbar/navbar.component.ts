import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from '../../dialogs/confirmation/confirmation.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  private breakpointObserver = inject(BreakpointObserver);

  constructor(
    private Dialog: MatDialog,
    private Router: Router
  ){}

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    logout(){
      const dialogRef = this.Dialog.open(ConfirmationComponent, {
        disableClose: true,
        data: {message: 'Are you sure you want to logout?'}
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result == true){
          localStorage.clear();
          this.Router.navigate(['/auth/login']);
        }
      })
    }
}
