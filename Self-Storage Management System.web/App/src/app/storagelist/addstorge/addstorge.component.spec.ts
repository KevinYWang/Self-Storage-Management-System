import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddstorgeComponent } from './addstorge.component';

describe('AddstorgeComponent', () => {
  let component: AddstorgeComponent;
  let fixture: ComponentFixture<AddstorgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddstorgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddstorgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
