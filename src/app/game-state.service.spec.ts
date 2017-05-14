import { TestBed, inject } from '@angular/core/testing';
import { GameStateService } from './game-state.service';

describe('GameStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameStateService]
    });
  });

  it('should ...', inject([GameStateService], (service: GameStateService) => {
    expect(service).toBeTruthy();
  }));
});
