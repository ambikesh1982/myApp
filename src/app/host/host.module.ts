import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddKitchenComponent } from './add-kitchen/add-kitchen.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { AuthSocialGuard } from '../core/auth-social.guard';

const hostRoutes: Routes = [
  {
    path: 'kitchen/:id',
    component: AddKitchenComponent,
  }
];


@NgModule({
  declarations: [AddKitchenComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    RouterModule.forChild(hostRoutes),
  ]
})
export class HostModule { }
