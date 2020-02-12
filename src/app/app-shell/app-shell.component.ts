import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss']
})
export class AppShellComponent {

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

  constructor(private breakpointObserver: BreakpointObserver, public auth: AuthService) {}

}
