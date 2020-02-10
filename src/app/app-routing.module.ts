import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './core/auth.guard';
import { AuthSocialGuard } from './core/auth-social.guard';


const routes: Routes = [
  {
    path: 'foodie',
    loadChildren: () => import('./foodie/foodie.module').then(m => m.FoodieModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'host',
    loadChildren: () => import('./host/host.module').then(m => m.HostModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  { path: 'welcome', component: WelcomeComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent, data: { title: 'PAGE_NOT_FOUND_PAGE' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
