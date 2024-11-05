import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuscarPokemonService {

  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  getPokemonSearch(nameOrId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${nameOrId}/`);
  }

}
