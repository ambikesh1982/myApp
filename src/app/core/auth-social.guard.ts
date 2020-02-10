import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthSocialGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    const user = await this.auth.getCurrentUser();
    console.log('User from AuthSocialGuard: ', user);
    if (user.isAnonymous) {
      console.log('Anonymous User >>>>>> : Redirecting to User page');
      this.router.navigate(['user', user.uid], { queryParams: { returnUrl: state.url } });
      return false;
    }
    console.log('User present >>>>>> : Redirecting to User page');
    return true;
  }

}
