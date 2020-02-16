import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { map, tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthSocialGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {
    console.log('AuthSocialGuard: Start');
   }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.currUser$.pipe(
      tap(resp => console.log('from tap: ', resp)),
      take(1),
      map( user => user.isAnonymous),
      tap(dummyUser => {
        if (dummyUser) {
          this.router.navigate(['/user']);
        }
      })
    );
  }
}

    //   } else {
    //     console.log('Anonymous User >>>>>> : Redirecting to User page');
    //     this.router.navigate(['user', user.uid], { queryParams: { returnUrl: state.url } });
    //     return false;
    //   }
    // } else {
    //   console.log('Unauthorised User >>>>>> : Redirecting to Welcome page');
    //   this.router.navigate(['welcome']);
