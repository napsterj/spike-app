import { TestBed } from '@angular/core/testing';

import { HttpHeaderService } from './http-header.service';

describe('TokenProviderService', () => {
  let service: HttpHeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpHeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
