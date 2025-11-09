import { Component, input, output, HostListener } from '@angular/core';
import { Juego } from '../services/juegos/Juego';

@Component({
  // El selector 'tr[app-tabla-juegos-fila]' indica que este componente se aplicará a elementos <tr>
  // que contengan el atributo 'app-tabla-juegos-fila'. Así, Angular reconocerá cada <tr app-tabla-juegos-fila>
  // como una instancia de este componente, facilitando la reutilización para cada fila de una tabla de juegos.
  selector: 'tr[app-tabla-juegos-fila]',
  imports: [],
  templateUrl: 'tabla-juegos-fila.html',
  styleUrl: 'tabla-juegos-fila.css'
})

/**
 * Componente de fila para la tabla de juegos.
 * 
 * - Recibe un juego como input.
 * - Expone un output 'juegoSeleccionado' que emite el juego correspondiente cuando la fila se hace click.
 * 
 * El decorador @HostListener escucha el evento 'click' directamente sobre el elemento <tr>
 * sobre el cual se renderiza esta clase (gracias al selector 'tr[app-tabla-juegos-fila]').
 * Esto significa que cuando cualquier parte de la fila es clickeada, se ejecuta el método 'seleccionar'.
 * Dicho método notifica al componente padre (por ejemplo, para habilitar edición o marcar la fila como seleccionada)
 * emitiendo el juego actual.
 */
export class TablaJuegosFila {
  // Input obligatorio que recibe el objeto Juego correspondiente a esta fila
  juego = input.required<Juego>();

  // Output que permite comunicar al padre que esta fila fue seleccionada (clicada)
  juegoSeleccionado = output<Juego>();

  // El decorador HostListener indica que cuando se produzca un click sobre la fila (<tr>), 
  // se ejecutará el método seleccionar().
  // Esto permite manejar la selección de la fila sin necesidad de agregar (click) manualmente en el template.
  @HostListener('click')
  seleccionar() {
    // Emitimos el juego asociado a esta fila para notificar al padre
    this.juegoSeleccionado.emit(this.juego());
  }
}


