import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';



const userRoutes: Routes = [
  {
    path: ':id',
    component: UserProfileComponent,
    // ...canActivate(loggedIn)
  }
];

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(userRoutes)
  ]
})
export class UserModule { }
