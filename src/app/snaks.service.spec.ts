import { TestBed, inject } from '@angular/core/testing';

import { SnaksService } from './snaks.service';

describe('SnaksService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SnaksService]
    });
  });

  it('should be created', inject([SnaksService], (service: SnaksService) => {
    expect(service).toBeTruthy();
  }));
});
