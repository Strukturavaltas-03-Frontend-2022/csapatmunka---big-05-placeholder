import { TestBed } from '@angular/core/testing';

import { CustomerTableService } from './customer-table.service';

describe('CustomerService', () => {
  let service: CustomerTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
