import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/core/layout.service';

@Component({
  selector: 'app-kitchen-detail',
  templateUrl: './kitchen-detail.component.html',
  styleUrls: ['./kitchen-detail.component.scss']
})
export class KitchenDetailComponent implements OnInit {

  constructor(private layout: LayoutService) {
    this.layout.appToolBar$.next({ pageTitle: 'Kitchen details', showGoBackIcon: true  });
   }

  ngOnInit() {
  }

}
