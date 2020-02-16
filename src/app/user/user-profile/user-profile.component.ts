import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService, AppUser } from 'src/app/core/auth.service';
import { LayoutService } from 'src/app/core/layout.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {

  currentUser$: Observable<AppUser>;
  user: AppUser;
  userForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthService,
    private layout: LayoutService
  ) {
    this.layout.appToolBar$.next({
      pageTitle: 'My Profile',
      showGoBackIcon: true
    });
    this.currentUser$ = this.auth.currUser$;
  }

  loginWithGoogle(anonymousUser: AppUser) {
    this.auth.googleSignin();

  }

}
