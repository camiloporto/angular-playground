
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {MatNativeDateModule} from '@angular/material/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app/app.component';

import { MatSliderModule } from '@angular/material/slider';
import { AccountStatementComponent } from './app/account-statement/account-statement.component';
import {DemoMaterialModule} from './app/material-module';

@NgModule({
  imports: [
    DemoMaterialModule, 
    BrowserModule, 
    FormsModule,
    HttpClientModule, 
    MatNativeDateModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
    {path: 'account-statement', component: AccountStatementComponent},
  ]), MatSliderModule],
  declarations: [ AppComponent, AccountStatementComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


/**  Copyright 2021 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */