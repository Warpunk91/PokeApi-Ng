import { TestBed } from '@angular/core/testing';

import { BuscarPokemonService } from './buscar-pokemon.service';

describe('BuscarPokemonService', () => {
  let service: BuscarPokemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscarPokemonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
