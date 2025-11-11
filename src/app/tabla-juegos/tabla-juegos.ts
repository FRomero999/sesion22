import { Component, inject, input, output } from '@angular/core';
import { Juegos } from '../services/juegos/juegos';
import { TablaJuegosFila } from '../tabla-juegos-fila/tabla-juegos-fila';
import { Juego } from '../services/juegos/Juego';

@Component({
  selector: 'app-tabla-juegos',
  imports: [TablaJuegosFila],
  templateUrl: 'tabla-juegos.html',
  styleUrl: 'tabla-juegos.css'
})
/**
 * Componente TablaJuegos
 * 
 * Este componente representa la tabla principal que lista los juegos en forma de tabla.
 * 
 * - Recibe como input un arreglo de juegos (Juegos), gracias a la propiedad 'juegos', que utiliza la API de signals.
 * - Expone un output 'juegoSeleccionado', que permite comunicar al componente padre
 *   cuando un juego de la tabla es seleccionado para editar o mostrar detalles.
 * - El método 'onJuegoSeleccionado' se utiliza como manejador para propagar hacia afuera el evento de selección
 *   de un juego, usando el Output.
 * 
 * Este patrón permite que los componentes hijos (por ejemplo, las filas) puedan avisar a TablaJuegos
 * y que éste propague esa selección al componente superior.
 */
export class TablaJuegos {
  // Signal/Input que recibe el listado de juegos para mostrar en la tabla
  public juegos = input<Juego[]>([]);

  // Output/EventEmitter que emite un juego cuando el usuario selecciona una fila
  juegoSeleccionado = output<Juego>();

  /**
   * Handler para el evento de selección de un juego.
   * Cuando se selecciona una fila, este método se llama con el juego correspondiente
   * y lo emite al componente padre.
   */
  onJuegoSeleccionado(juego: Juego) {
    /* cuando recibo un evento desde el componente */
    this.juegoSeleccionado.emit(juego);
  }
}
