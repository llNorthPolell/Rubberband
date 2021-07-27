import { TestBed } from '@angular/core/testing';

import { DragTrackerService } from './drag-tracker.service';

describe('DragTrackerService', () => {
  let service: DragTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DragTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
