import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { BuscarPokemonService } from '../../service/buscar-pokemon.service';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext'; 


@Component({
  selector: 'app-buscar-pokemon',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    InputTextModule,
  ],
  templateUrl: './buscar-pokemon.component.html',
  styleUrl: './buscar-pokemon.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BuscarPokemonComponent {

  pokemonesCompletos = signal<any>(null);
  pokemonNameOrId = signal('');
  isFrontImage = signal(true); 
  imageToggleInterval: any;

  constructor(private pokeApi: BuscarPokemonService){}

  loadPokemon(){
    if(this.pokemonNameOrId().length > 0){
      this.pokeApi.getPokemonSearch(this.pokemonNameOrId()).subscribe({
        next: (data: any)=> {
          this.pokemonesCompletos.update(() => [data]);
          this.playSound(data.cries.latest);
          this.startImageToggle();
        },
      });
    } 
  }

  playSound(soundSource: string){
    const audio = new Audio();
    audio.src = soundSource;
    audio.load();
    audio.play();
  }

  updateName(name: string) {
    this.pokemonNameOrId.set(name.toLocaleLowerCase());
  }

  startImageToggle() {
    // Limpiar intervalo previo si existía
    if (this.imageToggleInterval) {
      clearInterval(this.imageToggleInterval);
    }

    // Iniciar nuevo intervalo de cambio de imagen cada 10 segundos
    this.imageToggleInterval = setInterval(() => {
      this.isFrontImage.update(value => !value);
    }, 1000); // 10 segundos
  }

  get pokemonImageUrl() {
    return computed(() => {
      const pokemonesCompletos = this.pokemonesCompletos();
      if (pokemonesCompletos) {
        return this.isFrontImage() ? pokemonesCompletos[0].sprites.front_default : pokemonesCompletos[0].sprites.back_default;
      }
      return null;
    });
  }

  ngOnDestroy() {
    // Limpiar el intervalo cuando el componente se destruya
    if (this.imageToggleInterval) {
      clearInterval(this.imageToggleInterval);
    }
  }

}