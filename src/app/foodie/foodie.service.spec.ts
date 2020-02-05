import { TestBed } from '@angular/core/testing';

import { FoodieService } from './foodie.service';

describe('FoodieService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FoodieService = TestBed.get(FoodieService);
    expect(service).toBeTruthy();
  });
});
