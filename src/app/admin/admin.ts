import { Component, inject, signal } from '@angular/core';
import { AddJuego } from '../add-juego/add-juego';
import { TablaJuegos } from "../tabla-juegos/tabla-juegos";
import { Juegos } from '../services/juegos/juegos';
import { Juego } from '../services/juegos/Juego';

@Component({
  selector: 'app-admin',
  imports: [AddJuego, TablaJuegos],
  templateUrl: 'admin.html',
  styleUrl: 'admin.css'
})
/**
 * Componente Admin: administra el panel de juegos, permitiendo visualizar la lista y seleccionar juegos para editar/agregar.
 * 
 * - 'datos': inyecta el servicio Juegos para acceder a los datos y operaciones sobre la colección.
 * - 'juegos': almacena (como Signal reactivo) la lista completa de juegos, para mostrarla en la tabla.
 * - 'juegoSeleccionado': signal que representa el juego que ha sido seleccionado para edición/agregado. Puede ser undefined si no hay nada seleccionado.
 * - 'onJuegoSeleccionado': método que será llamado cuando una fila de la tabla dispare un evento de selección
 *                          (mediante @Output), y actualiza el signal 'juegoSeleccionado' con el juego elegido.
 */
export class Admin {
  // Inyecta el servicio de los datos de juegos
  private datos = inject(Juegos);

  // Signal reactivo que contiene la lista de juegos actual
  public juegos = this.datos.listarJuegos();

  // Signal que representa el juego actualmente seleccionado (o undefined si no hay selección)
  juegoSeleccionado = signal<Juego | undefined>(undefined);

  /**
   * Actualiza el juego seleccionado cuando una fila de la tabla dispare el evento correspondiente.
   * 
   * @param juego - El juego que acaba de seleccionarse en la UI
   */
  onJuegoSeleccionado(juego: Juego) {
    this.juegoSeleccionado.set(juego);
  }
}

