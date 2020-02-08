import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/core/layout.service';
import { ActivatedRoute } from '@angular/router';
import { DialogService, IContactInfo } from 'src/app/core/dialog.service';
import { Observable } from 'rxjs';
import { Kitchen } from '../kitchen';

@Component({
  selector: 'app-kitchen-detail',
  templateUrl: './kitchen-detail.component.html',
  styleUrls: ['./kitchen-detail.component.scss']
})
export class KitchenDetailComponent implements OnInit {
  kitchen: Kitchen;
  menu$: Observable<any[]>;

  constructor(
    private route: ActivatedRoute,
    private layout: LayoutService,
    private ds: DialogService) {
    this.layout.appToolBar$.next({ showSideNavToggleIcon: true, showGoBackIcon: true  });
   }

  ngOnInit() {
    this.kitchen = this.route.snapshot.data.kitchen;
  }

  openDialog() {
    const contactInfo: IContactInfo = { email: this.kitchen.email, phone: this.kitchen.mobileNo };
    this.ds.openContactDialog(contactInfo);
  }

  goBack() {}

}
