import { TestBed, inject } from '@angular/core/testing';

import { InterfaceService } from './interface.service';

describe('InterfaceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InterfaceService]
    });
  });

  it('should ...', inject([InterfaceService], (service: InterfaceService) => {
    expect(service).toBeTruthy();
  }));
});
