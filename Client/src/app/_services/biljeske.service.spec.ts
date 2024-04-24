import { TestBed } from '@angular/core/testing';

import { BiljeskeService } from './biljeske.service';

describe('BiljeskeService', () => {
  let service: BiljeskeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BiljeskeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
