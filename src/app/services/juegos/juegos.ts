import { Injectable, signal, Signal } from '@angular/core';
import { Juego } from './Juego';

@Injectable({
  providedIn: 'root'
})

export class Juegos {

    iniciales : Juego[] = [
      { id: 1, titulo: 'The Legend of Zelda: Ocarina of Time', agno: 1998, plataforma: 'Nintendo 64', genero: 'Aventura' },
      { id: 2, titulo: 'Super Mario World', agno: 1990, plataforma: 'SNES', genero: 'Plataformas' },
      { id: 3, titulo: 'Final Fantasy VII', agno: 1997, plataforma: 'PlayStation', genero: 'RPG' },
      { id: 4, titulo: 'Half-Life', agno: 1998, plataforma: 'PC', genero: 'Shooter' },
      { id: 5, titulo: 'Resident Evil 2', agno: 1998, plataforma: 'PlayStation', genero: 'Terror' }
    ];

    private internos = signal<Juego[]>(this.iniciales)

    listarJuegos() : Signal<Juego[]> {
      return this.internos
    }
    
    añadirJuego( juego: Juego) {
      this.internos.update( lista  => {
          return [...lista, juego]
      })
      
    }
  
}
