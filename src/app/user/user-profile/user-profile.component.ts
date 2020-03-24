import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService, AppUser } from 'src/app/core/auth.service';
import { LayoutService } from 'src/app/core/layout.service';
import { tap } from 'rxjs/operators';
import { Kitchen } from 'src/app/foodie/kitchen';
import { KitchenService } from 'src/app/core/kitchen.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {

  currentUser$: Observable<AppUser>;
  kitchen$: Observable<Kitchen>;
  userForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthService,
    private layout: LayoutService,
    private ks: KitchenService
  ) {
    this.layout.appToolBar$.next({
      showSideNavToggleIcon: true,
      pageTitle: 'My Profile',
      showGoBackIcon: true
    });
    this.currentUser$ = this.auth.currUser$.pipe(
      tap (cu => {
        if (cu.kitchenId) {
          this.kitchen$ = this.ks.getKitchenByID(cu.kitchenId);
        }
      })
    );
  }

  loginWithGoogle(anonymousUser: AppUser) {
    this.auth.googleSignin();
  }

  logout() {
    this.auth.signOut();
  }

  navigateToMyKitchen(kitchenId: string) {
    this.router.navigate(['host', kitchenId, 'myKitchen']);
  }

}
