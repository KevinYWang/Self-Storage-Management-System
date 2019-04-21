import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from '../models/account';


@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {

    let accountString: string = localStorage.getItem('currentUser');
    if (accountString === null) {
      this.router.navigate(['/login']);
    }
    let account: Account = JSON.parse(accountString);
    if (account === null || account.token === null) {
      this.router.navigate(['/login']);
    };
  }


  logout() {
    // execute clearing current user cache
    this.router.navigate(['/login']);
  }
}
