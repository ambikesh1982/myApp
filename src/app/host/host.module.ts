import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddKitchenComponent } from './add-kitchen/add-kitchen.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { AuthSocialGuard } from '../core/auth-social.guard';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

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
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(hostRoutes),
  ]
})
export class HostModule { }
