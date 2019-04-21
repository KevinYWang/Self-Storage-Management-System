import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, AuthenticationService } from '../../service';

@Component({
  selector: 'app-accountsignin',
  templateUrl: './accountsignin.component.html',
  styleUrls: ['./accountsignin.component.css']
})
export class AccountsigninComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  loginFailed=false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/home';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    var self = this;
    this.authenticationService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.loginFailed = false;
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.loginFailed = true;
          this.loading = false;
          setTimeout(function () {
            self.loginFailed = false;
          }, 3000);
        });
  }
}
