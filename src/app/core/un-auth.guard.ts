import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UnAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    const user = await this.authService.getCurrentUser();
    const loggedIn = !!user;
    if (loggedIn && !user.isAnonymous) {
      console.log('LoggedIn User: Redirecting to Main page');
      this.router.navigate(['foodie', 'kitchens']);
      return false;
    }
    return true;
  }
}

