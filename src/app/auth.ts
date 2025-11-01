import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class Auth {
  private readonly USER = 'Francisco';
  private readonly PASS = '1234';
  private readonly EMAIL = 'francisco@example.com';
  private readonly LOCAL_KEY = 'auth_user';

  private readonly isLoggedSignal = signal<boolean>(false);
  private readonly emailUsuarioSignal = signal<string | null>(null);

  readonly isLogged = this.isLoggedSignal.asReadonly();
  readonly emailUsuario = this.emailUsuarioSignal.asReadonly();

  constructor() {
    this.actualizarEstado();
  }

  private actualizarEstado(): void {
    const sesion = this.obtenerDatosSesion();
    this.isLoggedSignal.set(!!sesion);
    this.emailUsuarioSignal.set(sesion?.email ?? null);
  }

  private obtenerDatosSesion(): { email: string; codigo: string } | null {
    try {
      const data = JSON.parse(localStorage.getItem(this.LOCAL_KEY) ?? 'null');
      return data?.email === this.EMAIL && typeof data?.codigo === 'string' ? data : null;
    } catch {
      return null;
    }
  }

  private generarCodigoAleatorio(): string {
    return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
  }

  login(email: string, password: string): boolean {
    if ((email === this.EMAIL || email === this.USER) && password === this.PASS) {
      localStorage.setItem(
        this.LOCAL_KEY,
        JSON.stringify({ email: this.EMAIL, codigo: this.generarCodigoAleatorio() })
      );
      this.actualizarEstado();
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.LOCAL_KEY);
    this.actualizarEstado();
  }
}
