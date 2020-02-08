import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppToolbarComponent } from './app-toolbar/app-toolbar.component';
import { MaterialModule } from '../material/material.module';
import { DialogContactCardComponent } from './dialog-contact-card/dialog-contact-card.component';
import { TruncatePipe } from './truncate.pipe';

const SHARED_COMPONENTS = [
  AppToolbarComponent,
  TruncatePipe,
];


@NgModule({
  declarations: [AppToolbarComponent, DialogContactCardComponent, TruncatePipe],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    SHARED_COMPONENTS
  ],
  entryComponents: [DialogContactCardComponent]
})
export class SharedModule { }
