import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppToolbarComponent } from './app-toolbar/app-toolbar.component';
import { MaterialModule } from '../material/material.module';

const SHARED_COMPONENTS = [
  AppToolbarComponent,
];


@NgModule({
  declarations: [AppToolbarComponent],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    SHARED_COMPONENTS
  ]
})
export class SharedModule { }
