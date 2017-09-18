import { TestBed, inject } from '@angular/core/testing';

import { FilterEventService } from './filter-event.service';

describe('FilterEventService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilterEventService]
    });
  });

  it('should be created', inject([FilterEventService], (service: FilterEventService) => {
    expect(service).toBeTruthy();
  }));
});
