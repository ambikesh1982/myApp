import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/core/layout.service';

@Component({
  selector: 'app-kitchen-list',
  templateUrl: './kitchen-list.component.html',
  styleUrls: ['./kitchen-list.component.scss']
})
export class KitchenListComponent implements OnInit {

  constructor(private router: Router, private layout: LayoutService) { }

  ngOnInit() {
    this.layout.appToolBar$.next({ showSideNavToggleIcon: true });
  }

  navigateToKitchenDetails(id: string) {
    console.log('Kitchen selected: ', id);
    this.router.navigate(['foodie', 'kitchens', id]);
  }

}
