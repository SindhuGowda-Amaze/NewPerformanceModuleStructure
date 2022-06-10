import { TestBed } from '@angular/core/testing';

import { PerformancemanagementService } from './performancemanagement.service';

describe('PerformancemanagementService', () => {
  let service: PerformancemanagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerformancemanagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
