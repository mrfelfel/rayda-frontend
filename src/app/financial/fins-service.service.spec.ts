import { TestBed } from '@angular/core/testing';

import { FinsServiceService } from './fins-service.service';

describe('FinsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FinsServiceService = TestBed.get(FinsServiceService);
    expect(service).toBeTruthy();
  });
});
