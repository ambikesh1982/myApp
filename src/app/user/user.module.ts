import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';



const userRoutes: Routes = [
  {
    path: '',
    component: UserProfileComponent,
    // ...canActivate(loggedIn)
  }
];

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(userRoutes)
  ]
})
export class UserModule { }
