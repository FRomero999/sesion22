import { Component, Input, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Juego } from '../services/juegos/Juego';

@Component({
  selector: 'app-gamecard',
  imports: [RouterLink],
  templateUrl: './gamecard.html',
  styleUrl: './gamecard.css'
})
export class Gamecard {
  // API moderna: input() retorna un Signal
  game = input.required<Juego>()
  value = input<Number>(0)
  alt = input<String>("")
    
}

