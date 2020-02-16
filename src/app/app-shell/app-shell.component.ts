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
  currAppUser: Observable<AppUser>;
  kitchenId: string;
  menuName: string;
  menuRoute: string;

  navList = [
    { menuIcon: 'home', menuName: this.menuRoute, menuRoute: this.menuRoute },
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
    this.currAppUser = this.auth.currUser$.pipe(
      tap(user => {
        if (user && user.kitchenId) {
            console.log('User has kitchen: ', user.kitchenId);
            this.kitchenId = user.kitchenId;
            this.handleKitchenRedirect(this.kitchenId);
        } else {
            console.log('No kitchen for user: Setup one');
            this.kitchenId = null;
            this.handleKitchenRedirect(null);
        }
      })
    );
  }

  handleKitchenRedirect(kitchenId: string) {
    if (kitchenId) {
      this.menuName = 'MyKitchen';
      this.menuRoute = `/host/kitchen/${kitchenId}`;
      console.log(this.menuRoute);
    } else {
      this.menuName = 'Setup your kitchen';
      this.menuRoute = '/host/kitchen/*new';
      console.log(this.menuRoute);
    }
  }

  ngOnDestroy() {
    console.log('Component destroyed!!!');
  }

}
