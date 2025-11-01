import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private router = inject(Router);
  private auth = inject(Auth);
  
  email: string = '';
  password: string = '';

  entrar() {
    console.log('Entrar - Email:', this.email);
    if (this.auth.login(this.email, this.password)) {
      this.router.navigate(['/']);
    } else {
      alert('Credenciales incorrectas');
    }
  }

  cancelar() {
    this.email = '';
    this.password = '';
    console.log('Cancelar');
    this.router.navigate(['/']);
  }
}

