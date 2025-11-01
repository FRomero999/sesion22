import { computed, effect, Injectable, signal, Signal } from '@angular/core';
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

    private internos = signal<Juego[]>( this.cargar() ?? this.iniciales)

    constructor(){
      effect( ()=>{
        localStorage.setItem("DATOS", JSON.stringify(this.internos()))
      })
    }

    listarJuegos() : Signal<Juego[]> {
      return this.internos
    }

    // Computed signal para el total de juegos, 
    // se actualiza automáticamente cuando se añade o elimina un juego.
    public readonly totalJuegos = computed(() => this.internos().length);
    
    añadirJuego( juego: Juego) {

      // this.internos.set( [...this.internos(),juego] )

      this.internos.update( lista  => {
        return [...lista, juego]
      })
      
    }

    private cargar() : Juego[] | null {
      const datos = localStorage.getItem("DATOS")
      return datos ? JSON.parse(datos) : null
    }

    juegosMasRecientes(): Signal<Juego[]> {
      // Copiar la lista actual, ordenarla por agno descendente y devolver los 5 primeros.
      return signal( [...this.internos()].sort((a, b) => b.agno - a.agno).slice(0, 5) );
    }

    obtenerJuegoPorId(id: number): Signal<Juego | undefined> {
      return computed(() => this.internos().find(juego => juego.id === id));
    }
}
