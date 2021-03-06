import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import 'firebase/firestore';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import 'firebase/storage';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { AppShellComponent } from './app-shell/app-shell.component';


import { FlexLayoutModule } from '@angular/flex-layout';

import { WelcomeComponent } from './welcome/welcome.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HelpCenterComponent } from './help-center/help-center.component';

@NgModule({
  declarations: [
    AppComponent,
    AppShellComponent,
    WelcomeComponent,
    PageNotFoundComponent,
    HelpCenterComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'Foodz9'),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AngularFireAuthGuardModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    LayoutModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
