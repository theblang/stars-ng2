import { TestBed, inject } from '@angular/core/testing'

import { GeneratorService } from './generator.service'

describe('GeneratorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeneratorService]
    })
  })

  it('should ...', inject([GeneratorService], (service: GeneratorService) => {
    expect(service).toBeTruthy()
  }))
})
