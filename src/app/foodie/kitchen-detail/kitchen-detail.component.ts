import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/core/layout.service';
import { ActivatedRoute } from '@angular/router';
import { DialogService, IContactInfo } from 'src/app/core/dialog.service';
import { Observable, of } from 'rxjs';
import { Kitchen } from '../kitchen';
import { KitchenService } from 'src/app/core/kitchen.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-kitchen-detail',
  templateUrl: './kitchen-detail.component.html',
  styleUrls: ['./kitchen-detail.component.scss']
})
export class KitchenDetailComponent implements OnInit {
  kitchen: Kitchen;
  errorMessage;

  menu$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private layout: LayoutService,
    private ds: DialogService,
    private ks: KitchenService) {
    this.layout.appToolBar$.next({ showSideNavToggleIcon: true, showGoBackIcon: true  });
   }

  ngOnInit() {
    this.kitchen = this.route.snapshot.data.kitchen;
    this.menu$ = this.ks.getMenuItems(this.kitchen.id).pipe(
      catchError(e => {
        const message = `Retrieval error: ${e}`;
        console.error('MyKitchenResolver: error >>', e);
        return of({ menu: null, error: message });
      })
    );
  }

  openDialog() {
    const contactInfo: IContactInfo = { email: this.kitchen.email, phone: this.kitchen.mobileNo };
    this.ds.openContactDialog(contactInfo);
  }

  goToLink(url: string) {
    window.open(url, '_blank');
  }

}
