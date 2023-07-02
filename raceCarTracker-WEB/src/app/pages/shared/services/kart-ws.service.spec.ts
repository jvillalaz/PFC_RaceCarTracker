import { TestBed } from '@angular/core/testing';

import { KartWsService } from './kart-ws.service';

describe('KartWsService', () => {
  let service: KartWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KartWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
