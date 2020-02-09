import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService, AppUser } from 'src/app/core/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {

  currentUser: Observable<AppUser>;

  constructor(private router: Router, private auth: AuthService) {
    this.currentUser = this.auth.currUser$;
  }

  loginGoogle(address: string) {
    // this.auth.upgradeAnonymosToSocial().then(() => this.router.navigate(['/']));
    // this.auth.googleSignin(address);

  }

}
