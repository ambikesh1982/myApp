import { Component, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay, tap, first } from 'rxjs/operators';
import { AuthService, AppUser } from '../core/auth.service';
import { SnackbarNotificationService } from '../core/snackbar-notification.service';

@Component({
  selector: 'app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss']
})
export class AppShellComponent implements OnDestroy {

  cu: AppUser;
  sub: Subscription;

  navList = [
    { menuIcon: 'home', menuName: 'My Kitchen', menuRoute: '/' },
    // { menuIcon: 'assignment', menuName: 'My Orders', menuRoute: '/checkout' },
    // { menuIcon: 'shopping_cart', menuName: 'Cart', menuRoute: '/cart' },
    { menuIcon: 'favorite', menuName: 'Wish List', menuRoute: '/wishlist' },
    // { menuIcon: 'account_circle', menuName: 'Profile', menuRoute: '/user' },
    // { menuIcon: 'language', menuName: 'Language', menuRoute: './' },
    // { menuIcon: 'android', menuName: 'Download App', menuRoute: './' },
    // { menuIcon: 'help', menuName: 'Help', menuRoute: './' },
    { menuIcon: 'feedback', menuName: 'Feedback', menuRoute: './' },

  ];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public auth: AuthService,
    private notify: SnackbarNotificationService) {
    this.sub = this.auth.currUser$.pipe(
      first(),
      tap( user => {
        this.cu = user;
        this.notify.openSnackBar('Welcome ' + this.cu.displayName + ' !!');
      })
    ).subscribe();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
