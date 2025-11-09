import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Juegos } from '../services/juegos/juegos';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-juego-detail',
  imports: [CommonModule],
  templateUrl: './juego-detail.html',
  styleUrl: './juego-detail.css'
})
/**
 * Componente JuegoDetail: muestra los detalles de un juego específico.
 * 
 * - 'route': se inyecta para acceder a los parámetros de la ruta activa (URL).
 * - 'router': se inyecta para poder hacer navegación/redirección programática.
 * - 'datos': instancia al servicio Juegos para acceder a los métodos y datos de juegos.
 * - 'juegoId': almacena el identificador del juego extraído de la URL. Se convierte a número porque por defecto todo parámetro de ruta es string.
 * - 'juego': contiene el objeto juego correspondiente al 'juegoId' obtenido. Se usa el método 'obtenerJuegoPorId' del servicio para buscarlo.
 * - 'volver()': método que permite regresar al home llamando a router.navigate(['/']).
 */
export class JuegoDetail {
  // Inyecta el servicio de rutas para acceder a parámetros URL
  private route = inject(ActivatedRoute);

  // Inyecta el router para permitir navegación programática
  private router = inject(Router);

  // Servicio de juegos para obtener datos
  private datos = inject(Juegos);

  // Obtiene el 'id' del juego desde los parámetros de la URL, y lo convierte a número
  juegoId = Number(this.route.snapshot.params['id']);

  // Busca en el servicio el juego cuyo id coincide con el parámetro extraído
  juego = this.datos.obtenerJuegoPorId(this.juegoId);

  /**
   * Método para volver a la página principal.
   * Utiliza el router para navegar a la ruta raíz ('/').
   */
  volver() {
    this.router.navigate(['/']);
  }
}

