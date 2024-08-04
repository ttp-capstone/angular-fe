import { TestBed } from '@angular/core/testing';

import { CustomerDasboardService } from './customer-dasboard.service';

describe('CustomerDasbaordService', () => {
  let service: CustomerDasboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerDasboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
