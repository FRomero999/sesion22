import { computed, effect, Injectable, signal, Signal } from '@angular/core';
import { Juego } from './Juego';

@Injectable({
  providedIn: 'root'
})

/**
 * Servicio centralizado para administrar la colección de juegos.
 * Implementa almacenamiento reactivo mediante signals y sincronización con localStorage.
 */
export class Juegos {

    /**
     * Datos iniciales a utilizar si no hay datos guardados en localStorage.
     * Cada juego cuenta con propiedades clave (id, título, año, plataforma, género).
     */
    iniciales : Juego[] = [
      { id: 1, titulo: 'The Legend of Zelda: Ocarina of Time', agno: 1998, plataforma: 'Nintendo 64', genero: 'Aventura' },
      { id: 2, titulo: 'Super Mario World', agno: 1990, plataforma: 'SNES', genero: 'Plataformas' },
      { id: 3, titulo: 'Final Fantasy VII', agno: 1997, plataforma: 'PlayStation', genero: 'RPG' },
      { id: 4, titulo: 'Half-Life', agno: 1998, plataforma: 'PC', genero: 'Shooter' },
      { id: 5, titulo: 'Resident Evil 2', agno: 1998, plataforma: 'PlayStation', genero: 'Terror' }
    ];

    /**
     * Signal reactivo que contiene la lista de juegos actual en memoria.
     * - Al iniciar, intenta cargar desde localStorage (si existe información previa), si no, usa 'iniciales'.
     */
    private internos = signal<Juego[]>( this.cargar() ?? this.iniciales)

    /**
     * Constructor del servicio:
     * - Establece un efecto reactivo: cada vez que cambia el contenido de 'internos', 
     *   persiste el nuevo estado en localStorage bajo la clave 'DATOS'.
     *   Garantiza persistencia automática tras cada cambio en la colección.
     */
    constructor(){
      effect( ()=>{
        localStorage.setItem("DATOS", JSON.stringify(this.internos()))
      })
    }

    /**
     * Devuelve el signal reactivo con toda la lista de juegos.
     * Permite que componentes se suscriban para recibir nuevas listas cuando cambian los datos.
     */
    listarJuegos() : Signal<Juego[]> {
      return this.internos
    }

    /**
     * Signal computado que representa el total de juegos en la colección.
     * Se actualiza automáticamente cuando se agregan o eliminan juegos (reactivo).
     */
    public readonly totalJuegos = computed(() => this.internos().length);
    
    /**
     * Añade un nuevo juego a la colección de forma reactiva.
     * - Usa 'update' para obtener la lista anterior y devolver una nueva lista extendida con el nuevo juego.
     * @param juego El juego a agregar.
     */
    añadirJuego( juego: Juego) {
      // Alternativa previa: this.internos.set( [...this.internos(), juego] )
      this.internos.update( lista  => {
        return [...lista, juego]
      })
    }

    /**
     * Intenta cargar la lista de juegos desde localStorage.
     * - Si existen datos en 'DATOS' los parsea y retorna.
     * - Si no existen datos previos, retorna null.
     * @returns Un array con los juegos cargados o null si no hay guardado.
     */
    private cargar() : Juego[] | null {
      const datos = localStorage.getItem("DATOS")
      return datos ? JSON.parse(datos) : null
    }

    /**
     * Devuelve un Signal reactivo con los 5 juegos más recientes (mayores valores de 'agno').
     * - La lista generada es una nueva señal, lista para usarse.
     * - Útil, por ejemplo, para mostrar los últimos lanzamientos en portada.
     */
    juegosMasRecientes(): Signal<Juego[]> {
      // Copiar la lista actual, ordenarla por agno descendente y devolver los 5 primeros.
      return signal( [...this.internos()].sort((a, b) => b.agno - a.agno).slice(0, 5) );
    }

    /**
     * Busca un juego específico por su id en la colección de juegos.
     * - Devuelve un Signal computado, el cual se reactualiza automáticamente si la lista cambia, 
     *   y el juego solicitado es afectado (por ejemplo al agregar o eliminar, o al editar su id).
     * @param id Identificador del juego a buscar.
     * @returns Un Signal con el juego encontrado (o undefined si no existe).
     */
    obtenerJuegoPorId(id: number): Signal<Juego | undefined> {
      return computed(() => this.internos().find(juego => juego.id === id));
    }
}
