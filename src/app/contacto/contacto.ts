import { Component } from '@angular/core';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';

@Component({
  selector: 'app-contacto',
  imports: [],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css'
})
export class AppContacto {
  // Datos básicos de contacto
  empresa = 'Mi Empresa Angular';
  telefono = '+34 123 456 789';
  email = 'contacto@miempresa.com';
  direccion = 'Calle Ejemplo, 123, 28001 Madrid, España';
  horario = 'Lunes a Viernes: 9:00 - 18:00';
}
