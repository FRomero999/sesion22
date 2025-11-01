import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Auth } from '../auth';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  protected auth = inject(Auth);
  
  // Acceso directo al signal del email desde el servicio
  get emailUsuario() {
    return this.auth.emailUsuario();
  }
}
