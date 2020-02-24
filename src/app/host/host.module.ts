import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddKitchenComponent } from './add-kitchen/add-kitchen.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { AuthSocialGuard } from '../core/auth-social.guard';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MyKitchenComponent } from './my-kitchen/my-kitchen.component';
import { KitchenFormComponent } from './kitchen-form/kitchen-form.component';

const hostRoutes: Routes = [
  {
    path: ':id/manage',
    component: AddKitchenComponent,
  },
  {
    path: ':id/myKitchen',
    component: MyKitchenComponent,
  }
];


@NgModule({
  declarations: [AddKitchenComponent, MyKitchenComponent, KitchenFormComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(hostRoutes),
  ]
})
export class HostModule { }
