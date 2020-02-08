import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/core/layout.service';
import { FoodieService } from '../foodie.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Kitchen } from '../kitchen';

@Component({
  selector: 'app-kitchen-list',
  templateUrl: './kitchen-list.component.html',
  styleUrls: ['./kitchen-list.component.scss']
})
export class KitchenListComponent implements OnInit {

  errorMessage;
  kitchens$: Observable<Kitchen[]> = this.foodieService.kitchens$
    .pipe(
      catchError(error => {
        this.errorMessage = error;
        return of(null);
      })
    );

  constructor(
    private foodieService: FoodieService,
    private router: Router,
    private layout: LayoutService) { }

  ngOnInit() {
    this.layout.appToolBar$.next({ showSideNavToggleIcon: true });
  }

  navigateToKitchenDetails(id: string) {
    console.log('Kitchen selected: ', id);
    this.router.navigate(['foodie', 'kitchens', id]);
  }

}
