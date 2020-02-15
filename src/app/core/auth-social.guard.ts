import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { map, tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthSocialGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    const user = await this.auth.getCurrentUser();
    if (user) {
      if (!user.isAnonymous) {
        console.log('Social User: ', !user.isAnonymous);
        return true;
      } else {
        console.log('Anonymous User >>>>>> : Redirecting to User page');
        this.router.navigate(['user', user.uid], { queryParams: { returnUrl: state.url } });
        return false;
      }
    } else {
      console.log('Unauthorised User >>>>>> : Redirecting to Welcome page');
      this.router.navigate(['welcome']);
      return false;
    }
  }

  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> {
  //   console.log('from Social Guard');
  //   if ( !!this.auth.currUser$ ) {
  //     if (this.auth.currUser.isAnonymous) {
  //       console.log('Social User: Access granted', this.auth.currUser);
  //       return of(true);
  //     } else {
  //       console.log('Anonymous User: Access denied', this.auth.currUser);
  //       this.router.navigate(['user', this.auth.currUser.uid], { queryParams: { returnUrl: state.url } });
  //       return of(false);
  //     }
  //   } else {
  //     console.log('user not logged in');

  //   }
  // }

}
