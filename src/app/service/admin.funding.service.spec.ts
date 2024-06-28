import { TestBed } from '@angular/core/testing';

import { FundingServiceAdmin } from './admin.funding.service';

describe('FundingService', () => {
  let service: FundingServiceAdmin;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FundingServiceAdmin);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
