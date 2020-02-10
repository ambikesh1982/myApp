import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  async canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    const user = await this.auth.getCurrentUser();
    if (!!user) {
      console.log('AuthGuard: canActivate(): ', true);
      return true;
    } else {
      console.log('AuthGuard: canActivate(): ', false);
      console.log('AuthGuard: this.router.navigate([\'welcome\'])');
      this.router.navigate(['welcome']);
      return true;
    }
  }
}
