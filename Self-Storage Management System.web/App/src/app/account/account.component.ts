import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, AccountService } from '../service';
import { Account } from '../models/account';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService) { }

  ngOnInit() {
    // set user info from localstorage;
    let accountString: string = localStorage.getItem('currentUser');
    if (accountString === null) {
      this.router.navigate(['/login']);
    }
    let account: Account = JSON.parse(accountString);
    if (account === null || account.token === null) {
      this.router.navigate(['/login']);
    };


    this.registerForm = this.formBuilder.group({
      firstName: [account.firstName, Validators.required],
      lastName: [account.lastName, Validators.required],
      email: [account.email, [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: [account.phoneNumber, Validators.required]
    });


  }


  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.accountService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Updat successful', true);
          this.router.navigate(['/storagelist']);
        },
        error => {
          this.alertService.error(error);
        });
  }
}
