import { Routes } from '@angular/router';
import { BuscarPokemonComponent } from './pokeApi/components/buscar-pokemon/buscar-pokemon.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch:  'full',
        redirectTo: 'app-buscar-pokemon'
    },
    {
        path: 'app-buscar-pokemon',
        component: BuscarPokemonComponent
    }
    
];
