import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Juegos } from '../services/juegos/juegos';
import { Auth } from '../auth';
import { Hero } from "../hero/hero";
import { Gamecard } from '../gamecard/gamecard';

@Component({
  selector: 'app-main-page',
  imports: [Hero, Gamecard],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css'
})

export class MainPage {
  private datos = inject(Juegos);
  protected auth = inject(Auth);

  juegosRecientes = this.datos.juegosMasRecientes();
  juegos = this.datos.listarJuegos();
  totalJuegos = this.datos.totalJuegos();

  logout() {
    this.auth.logout();
  }
}
