import { TestBed } from '@angular/core/testing';

import { StoragelistserviceService } from './storagelistservice.service';

describe('StoragelistserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StoragelistserviceService = TestBed.get(StoragelistserviceService);
    expect(service).toBeTruthy();
  });
});
