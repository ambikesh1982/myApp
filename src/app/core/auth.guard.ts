import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    const user = this.auth.currUser$;
    if (!!user) {
      console.log('AuthGuard: canActivate(): ', true);
      return of(true);
    } else {
      console.log('AuthGuard: canActivate(): ', false);
      console.log('AuthGuard: this.router.navigate([\'welcome\'])');
      this.router.navigate(['welcome']);
      return of(false);
    }
  }
}
