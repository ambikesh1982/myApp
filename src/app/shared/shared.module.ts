import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { AppToolbarComponent } from './app-toolbar/app-toolbar.component';
import { DialogContactCardComponent } from './dialog-contact-card/dialog-contact-card.component';
import { GooglePlacesDirective } from './google-places.directive';
import { ImgUploadComponent } from './img-upload/img-upload.component';
import { TruncatePipe } from './truncate.pipe';

const SHARED_COMPONENTS = [
  AppToolbarComponent,
  ImgUploadComponent,
  TruncatePipe,
  GooglePlacesDirective,
];


@NgModule({
  // declarations: [AppToolbarComponent, DialogContactCardComponent, GooglePlacesDirective, ImgUploadComponent, TruncatePipe],
  declarations: [SHARED_COMPONENTS, DialogContactCardComponent],
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
