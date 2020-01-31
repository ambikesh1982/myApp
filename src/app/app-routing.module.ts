import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  {
    path: 'foodie',
    loadChildren: () => import('./foodie/foodie.module').then(m => m.FoodieModule)
  },
  {
    path: 'host',
    loadChildren: () => import('./host/host.module').then(m => m.HostModule)
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
