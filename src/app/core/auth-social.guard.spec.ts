import { TestBed } from '@angular/core/testing';

import { AuthSocialGuard } from './auth-social.guard';

describe('AuthSocialGuard', () => {
  let guard: AuthSocialGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthSocialGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
