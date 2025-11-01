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
export class JuegoDetail {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private datos = inject(Juegos);

  // Obtenemos el ID del juego desde la URL y lo convertimos a número
  juegoId = Number(this.route.snapshot.params['id']);
  juego = this.datos.obtenerJuegoPorId(+this.juegoId);

  volver() {
    this.router.navigate(['/']);
  }
}

