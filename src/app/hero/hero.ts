import { Component, inject } from '@angular/core';
import { Auth } from '../auth';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})

export class Hero {
  protected auth = inject(Auth);

  logout() {
    this.auth.logout();
  }
}
