import { TestBed } from '@angular/core/testing';

import { SnackbarNotificationService } from './snackbar-notification.service';

describe('SnackbarNotificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SnackbarNotificationService = TestBed.get(SnackbarNotificationService);
    expect(service).toBeTruthy();
  });
});
