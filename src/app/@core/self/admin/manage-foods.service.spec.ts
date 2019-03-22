import { TestBed, inject } from '@angular/core/testing';

import { ManageFoodsService } from './manage-foods.service';

describe('ManageFoodsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManageFoodsService]
    });
  });

  it('should be created', inject([ManageFoodsService], (service: ManageFoodsService) => {
    expect(service).toBeTruthy();
  }));
});
