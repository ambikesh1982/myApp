import { Component } from '@angular/core';
import { Event, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'foodz9-dev';
  isLoading = false;
  constructor(private router: Router) {
    this.isLoading = false;
    this.router.events.subscribe((e: Event) => {
      this.checkRouterEvent(e);
    });
  }

  checkRouterEvent(e: Event): void {
    if (e instanceof NavigationStart) {
      this.isLoading = true;
    }
    if (
      e instanceof NavigationEnd ||
      e instanceof NavigationCancel ||
      e instanceof NavigationError
    ) {
      this.isLoading = false;
    }
  }
}
