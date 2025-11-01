import { Component } from '@angular/core';
import { AddJuego } from '../add-juego/add-juego';

@Component({
  selector: 'app-admin',
  imports: [AddJuego],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin {
}

