import { TestBed } from '@angular/core/testing';

import { AccesLogService } from './acces-log.service';

describe('AccesLogService', () => {
  let service: AccesLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccesLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
