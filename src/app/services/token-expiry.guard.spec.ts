import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { tokenExpiryGuard } from './token-expiry.guard';

describe('tokenExpiryGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => tokenExpiryGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
