import { Component, inject } from '@angular/core';
import { WeatherService } from '../services/weather/weather-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather',
  imports: [CommonModule],
  templateUrl: './weather.html',
  styleUrl: './weather.css'
})
export class Weather {

  weatherService = inject(WeatherService);

  /**
   * El método ngOnInit() es un ciclo de vida de los componentes en Angular.
   * Se ejecuta automáticamente justo después de crear el componente y de que Angular haya inicializado todas las propiedades de entrada.
   * Es el lugar ideal para poner lógica de inicialización que queremos que ocurra solo una vez cuando el componente se muestra por primera vez.
   * 
   * En este caso, al entrar el componente en pantalla, llamamos a this.loadWeather(), lo que provoca que se consulte la API para obtener los datos meteorológicos de Madrid.
   * Así, el usuario ve directamente la información del clima nada más cargar la página, sin necesidad de pulsar ningún botón.
   */
  ngOnInit() {
    // Llamamos al método que pide el clima de la ciudad.
    this.loadWeather();
  }

  loadWeather() {
    this.weatherService.getCityWeather("Madrid");
  }

}
