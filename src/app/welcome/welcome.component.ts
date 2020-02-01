import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../core/layout.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(private router: Router, private layout: LayoutService) { }

  ngOnInit() {
    this.layout.appToolBar$.next({ pageTitle: 'Foodz9*', showSideNavToggleIcon: true });
  }

  redirectToKitchenListPage() {
    console.log('redirectToKitchenListPage(): foodie/kitchens');
    this.router.navigate(['foodie', 'kitchens']);
  }

}
