import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialCollectionModule} from './material-module';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { StoragelistComponent } from './storagelist/storagelist.component';
import { AccountregisterComponent } from './accountregister/accountregister.component';
import { AccountsigninComponent } from './account/accountsignin/accountsignin.component';
import { AddstorgeComponent } from './storagelist/addstorge/addstorge.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AccountComponent,
    StoragelistComponent,
    AccountregisterComponent,
    AccountsigninComponent,
    AddstorgeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialCollectionModule,
    AgGridModule.withComponents([])
  ],
  providers: [],
  bootstrap: [HomeComponent]
})
export class AppModule { }
