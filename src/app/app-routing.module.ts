import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './core/auth.guard';
import { AuthSocialGuard } from './core/auth-social.guard';
import { UnAuthGuard } from './core/un-auth.guard';
import { HelpCenterComponent } from './help-center/help-center.component';

const routes: Routes = [
  {
    path: 'foodie',
    loadChildren: () => import('./foodie/foodie.module').then(m => m.FoodieModule),
  },
  {
    path: 'host',
    loadChildren: () => import('./host/host.module').then(m => m.HostModule),
    canActivate: [AuthSocialGuard]
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
  },
  {
    path: 'help',
    component: HelpCenterComponent
  },
  { path: 'welcome',
    component: WelcomeComponent,
    canActivate: [UnAuthGuard]
  },
  { path: '',
    redirectTo: 'foodie',
    pathMatch: 'full'
  },
  { path: '**',
    component: PageNotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
