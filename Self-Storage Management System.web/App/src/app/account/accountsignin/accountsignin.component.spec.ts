import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsigninComponent } from './accountsignin.component';

describe('AccountsigninComponent', () => {
  let component: AccountsigninComponent;
  let fixture: ComponentFixture<AccountsigninComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsigninComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
