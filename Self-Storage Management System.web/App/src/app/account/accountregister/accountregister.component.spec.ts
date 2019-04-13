import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountregisterComponent } from './accountregister.component';

describe('AccountregisterComponent', () => {
  let component: AccountregisterComponent;
  let fixture: ComponentFixture<AccountregisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountregisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
