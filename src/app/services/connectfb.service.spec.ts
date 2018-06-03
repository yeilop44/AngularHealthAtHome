import { TestBed, inject } from '@angular/core/testing';

import { ConnectfbService } from './connectfb.service';

describe('ConnectfbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConnectfbService]
    });
  });

  it('should be created', inject([ConnectfbService], (service: ConnectfbService) => {
    expect(service).toBeTruthy();
  }));
});
