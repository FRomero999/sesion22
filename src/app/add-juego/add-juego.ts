import { Component, inject, input, effect } from '@angular/core';
import { Juego } from '../services/juegos/Juego';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Juegos } from '../services/juegos/juegos';


@Component({
  selector: 'app-add-juego',
  imports: [FormsModule],
  template: `
    <form (ngSubmit)="agregar()">
      <label for="id">Id:</label>
      <input [(ngModel)]="juego.id" id="id" name="id" type="number"><br>

      <label for="nombre">Nombre:</label>
      <input [(ngModel)]="juego.titulo" id="nombre" name="nombre" type="text"><br>

      <label for="anio">Año:</label>
      <input [(ngModel)]="juego.agno" id="anio" name="anio" type="number"><br>

      <label for="plataforma">Plataforma:</label>
      <input [(ngModel)]="juego.plataforma" id="plataforma" name="plataforma" type="text"><br>

      <label for="genero">Género:</label>
      <input [(ngModel)]="juego.genero" id="genero" name="genero" type="text"><br>

      <button>Guardar</button>
    </form>
  `,
  styles: `
  form {
    max-width: 400px;
    margin: 24px auto;
    padding: 24px;
    border: 1px solid #ccc;
    border-radius: 12px;
    background: #f9f9f9;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  }

  label {
    display: block;
    margin: 12px 0 4px 0;
    font-weight: 500;
  }

  input[type="text"],
  input[type="number"] {
    width: 100%;
    padding: 8px 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
    font-size: 16px;
  }

  button[type="submit"] {
    margin-top: 12px;
    background-color: #1976d2;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 24px;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.2s;
  }

  button[type="submit"]:hover {
    background-color: #115293;
  }
  `
})
export class AddJuego {

  juego : Juego = {id:0,  titulo:"", agno:0, plataforma:"", genero:"" }
  private datos = inject(Juegos)
  public seleccion = input<Juego | undefined>();

  // El constructor utiliza un efecto reactivo para actualizar el juego local si cambia la entrada 'seleccion'.
  // Cuando 'seleccion' recibe un valor (cuando se selecciona un juego para editar), 
  // asigna dicho valor a la variable local 'juego' para que el formulario se rellene con los datos del juego seleccionado.
  constructor(){
    effect(() => {
      const sel = this.seleccion();
      if (sel) {
        this.juego = sel;
      }
    });
  }

  agregar(){
    console.log( this.juego )
    this.datos.añadirJuego(this.juego)
    console.log(this.datos.listarJuegos())
  }

}
