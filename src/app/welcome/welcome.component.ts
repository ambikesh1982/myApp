import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../core/layout.service';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  userAddress: string;

  constructor(private router: Router, private layout: LayoutService, private auth: AuthService) { }

  ngOnInit() {
    this.layout.appToolBar$.next({ pageTitle: 'Foodz9*', showSideNavToggleIcon: true });
  }

  collectAddress(formattedAddress: string) {
    this.userAddress = formattedAddress;
    console.log('collected Address: ', formattedAddress);
  }

  async loadFoodieModule() {
    try {
      console.log('redirectToKitchenListPage(): foodie/kitchens');
      await this.auth.loginAnonymously(this.userAddress);
      this.router.navigate(['foodie', 'kitchens']);
    } catch (e) {
      console.log('Error in loadFodieModule: ', e);
  }

  }


}
