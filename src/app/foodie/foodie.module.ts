import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KitchenListComponent } from './kitchen-list/kitchen-list.component';
import { KitchenDetailComponent } from './kitchen-detail/kitchen-detail.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';

const foodieRoutes: Routes = [
  { path: 'kitchens', component: KitchenListComponent },
  {
    path: 'kitchens/:id',
    component: KitchenDetailComponent,
    // resolve: { kitchen: KitchenResolver }
  },
  { path: '', redirectTo: 'kitchens', pathMatch: 'full' }
];

@NgModule({
  declarations: [KitchenListComponent, KitchenDetailComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    RouterModule.forChild(foodieRoutes),
  ]
})
export class FoodieModule { }
