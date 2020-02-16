import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/core/layout.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Kitchen } from '../kitchen';
import { AuthService } from 'src/app/core/auth.service';
import { KitchenService } from 'src/app/core/kitchen.service';

@Component({
  selector: 'app-kitchen-list',
  templateUrl: './kitchen-list.component.html',
  styleUrls: ['./kitchen-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KitchenListComponent implements OnInit {

  errorMessage;

  kitchens$: Observable<Kitchen[]> = this.ks.kitchens$
    .pipe(
      catchError(error => {
        this.errorMessage = error;
        return of(null);
      })
    );

  constructor(
    private ks: KitchenService,
    private router: Router,
    private layout: LayoutService,
    private auth: AuthService) {
    console.log('From KitchenListComponent');
  }

  ngOnInit() {
    this.layout.appToolBar$.next({ showSideNavToggleIcon: true});
  }

  navigateToKitchenDetails(id: string) {
    console.log('Kitchen selected: ', id);
    this.router.navigate(['foodie', 'kitchens', id]);
  }

}
