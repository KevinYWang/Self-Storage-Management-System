import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { StoragelistComponent } from './storagelist/storagelist.component';
import { AccountsigninComponent } from './account/accountsignin/accountsignin.component';
import { AccountregisterComponent } from './account/accountregister/accountregister.component';

const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path: 'home', component: HomeComponent,
    children: [
      { path: '', component: StoragelistComponent },
      { path: 'myaccount', component: AccountComponent },
      { path: 'storagelist', component: StoragelistComponent }
    ]
  },
  { path: 'login', component: AccountsigninComponent },
  { path: 'register', component: AccountregisterComponent },

  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
