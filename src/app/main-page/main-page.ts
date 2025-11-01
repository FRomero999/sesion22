import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Juegos } from '../services/juegos/juegos';
import { Auth } from '../auth';

@Component({
  selector: 'app-main-page',
  imports: [RouterLink],
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
