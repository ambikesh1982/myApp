import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthSocialGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.currUser$.pipe(
      tap(resp => console.log('from tap: ', resp)),
      take(1),
      map( user => !user.isAnonymous),
      tap(socialUser => {
        console.log('socialUser?: ', socialUser);
        if (!socialUser) {
          this.router.navigate(['/user']);
          return false;
        }
        console.log('AuthSocialGuard returns ', true);
        return true;
      })
    );
  }
}
