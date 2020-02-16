import { Component, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay, tap, first } from 'rxjs/operators';
import { AuthService, AppUser } from '../core/auth.service';
import { SnackbarNotificationService } from '../core/snackbar-notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss']
})
export class AppShellComponent implements OnDestroy {

  currAppUser$: Observable<AppUser>;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public auth: AuthService,
    private notify: SnackbarNotificationService,
    private router: Router) {
    this.currAppUser$ = this.auth.currUser$;
  }

  handleKitchenRedirect(kitchenId: string) {
    if (kitchenId) {
      this.router.navigate(['host', 'kitchen', kitchenId]);
    } else {
      this.router.navigate(['host', 'kitchen', '*new']);
    }
  }

  ngOnDestroy() {
    console.log('Component destroyed!!!');
  }

}
