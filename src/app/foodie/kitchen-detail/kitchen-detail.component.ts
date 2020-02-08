import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/core/layout.service';
import { ActivatedRoute } from '@angular/router';
import { DialogService, IContactInfo } from 'src/app/core/dialog.service';
import { Observable, of } from 'rxjs';
import { Kitchen, IMenuItem } from '../kitchen';
import { FoodieService } from '../foodie.service';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-kitchen-detail',
  templateUrl: './kitchen-detail.component.html',
  styleUrls: ['./kitchen-detail.component.scss']
})
export class KitchenDetailComponent implements OnInit {
  kitchen: Kitchen;
  errorMessage;

  menu$: Observable<IMenuItem[]>;

  constructor(
    private route: ActivatedRoute,
    private layout: LayoutService,
    private ds: DialogService,
    private foodieService: FoodieService) {
    this.layout.appToolBar$.next({ showSideNavToggleIcon: true, showGoBackIcon: true  });
   }

  ngOnInit() {
    this.kitchen = this.route.snapshot.data.kitchen;
    this.menu$ = this.foodieService.getMenuItems(this.kitchen.id);
  }

  openDialog() {
    const contactInfo: IContactInfo = { email: this.kitchen.email, phone: this.kitchen.mobileNo };
    this.ds.openContactDialog(contactInfo);
  }

  goBack() {}

}
