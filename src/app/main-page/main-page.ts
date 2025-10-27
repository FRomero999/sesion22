import { Component, inject } from '@angular/core';
import { Footer } from "../footer/footer";
import { Header } from "../header/header";
import { Juegos } from '../services/juegos/juegos';
import { AddJuego } from "../add-juego/add-juego";

@Component({
  selector: 'app-main-page',
  imports: [AddJuego],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css'
})

export class MainPage {

  private datos = inject(Juegos)

  listaJuegos = this.datos.listarJuegos();

}
