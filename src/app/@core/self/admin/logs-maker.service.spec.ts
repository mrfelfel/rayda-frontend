import { TestBed, inject } from '@angular/core/testing';

import { LogsMakerService } from './logs-maker.service';

describe('LogsMakerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogsMakerService]
    });
  });

  it('should be created', inject([LogsMakerService], (service: LogsMakerService) => {
    expect(service).toBeTruthy();
  }));
});
