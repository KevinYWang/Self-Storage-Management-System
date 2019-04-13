import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoragelistComponent } from './storagelist.component';

describe('StoragelistComponent', () => {
  let component: StoragelistComponent;
  let fixture: ComponentFixture<StoragelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoragelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoragelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
