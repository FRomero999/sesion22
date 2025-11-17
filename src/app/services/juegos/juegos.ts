import { computed, effect, inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { Juego } from './Juego';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})

export class Juegos {

    // Servicio 'Juegos' que gestiona la lista de juegos, sincronizándose con el servidor usando HTTP.
    // Lo más importante: cómo usa GET y POST para traer y guardar datos en la API.
    private http : HttpClient = inject(HttpClient) // Inyecta HttpClient para hacer peticiones HTTP.

    private url : string = "http://localhost:3000/juegos" // URL base de la API

    // Uso de GET:
    // Obtiene la lista de juegos del servidor mediante una petición HTTP GET.
    // Esto retorna un Observable con la lista de juegos que luego convertimos a signal.
    private iniciales = this.http.get<Juego[]>(this.url); 
    
    // Convierte el Observable a un signal reactivo para integrarlo con la reactividad de Angular.
    private datosServidor = toSignal(this.iniciales, {initialValue:[]})

    // Signal interno (WritableSignal) que guarda la lista actual de juegos en memoria.
    private internos: WritableSignal<Juego[]> = signal<Juego[]>([]);

    constructor(){
      // Sincroniza los datos del servidor con el signal interno cuando llegan resultados del GET.
      effect(() => {
        const datos = this.datosServidor();
        if (datos?.length > 0) {
          this.internos.set(datos); // Actualiza la lista interna con lo recibido del servidor vía GET.
        }
      });
    }

    // Devuelve el signal con la lista de juegos.
    listarJuegos() : Signal<Juego[]> {
      return this.internos
    }

    // Signal computado para saber cuántos juegos hay.
    public readonly totalJuegos = computed(() => this.internos().length);

    // Uso de POST:
    // Añade un juego nuevo enviando los datos al servidor mediante HTTP POST.
    // Cuando el servidor responde con el nuevo juego agregado, lo añade al signal interno.
    añadirJuego(juego: Juego) {
      // Enviamos el nuevo juego al backend usando POST.
      // Al suscribirnos, recibimos del servidor el juego efectivamente creado (incluyendo, por ejemplo, el ID asignado por el backend).
      this.http.post<Juego>(this.url, juego).subscribe({
        // Cuando la respuesta del servidor llega correctamente:
        next: (nuevo) => {
          // Actualizamos el signal interno añadiendo el nuevo juego a la lista actual de juegos.
          // Esto permite que la interfaz de usuario se actualice inmediatamente.
          this.internos.update(lista => [...lista, nuevo]);
        },
        // Si hay algún error durante la petición (por ejemplo, si el servidor está caído o devuelve error):
        error: (error) => {
          // Mostramos el error por consola para facilitar la depuración.
          console.error('Error al añadir juego:', error);
        }
      });
    }

    // Devuelve los 5 juegos más recientes según el año.
    juegosMasRecientes(): Signal<Juego[]> {
      return computed(() => {
        const lista = [...this.internos()];
        return lista.sort((a, b) => b.agno - a.agno).slice(0, 5);
      });
    }

    // Busca un juego por su id en la lista local.
    obtenerJuegoPorId(id: number): Signal<Juego | undefined> {
      return computed(() => this.internos().find(juego => juego.id === id));
    }
}
