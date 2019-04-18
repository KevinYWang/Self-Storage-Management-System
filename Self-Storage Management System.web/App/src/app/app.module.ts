import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule ,HTTP_INTERCEPTORS} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialCollectionModule } from './material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { StoragelistComponent } from './storagelist/storagelist.component';
import { AccountsigninComponent } from './account/accountsignin/accountsignin.component';
import { AccountregisterComponent } from './account/accountregister/accountregister.component';
import { AddstorgeComponent } from './storagelist/addstorge/addstorge.component';
import { UsageChartDirective } from './directive/usage-chart.directive';
import { AlertComponent } from './directive/alert.component';
import { AlertService, AuthenticationService, AccountService } from './service';
import { JwtInterceptor, ErrorInterceptor } from './helpers';
import { Globals } from './globals';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AccountComponent,
    StoragelistComponent,
    AccountsigninComponent,
    AccountregisterComponent,
    AddstorgeComponent,
    UsageChartDirective,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialCollectionModule,
    AgGridModule.withComponents([]),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    Globals,
    AlertService,
    AuthenticationService,
    AccountService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
