import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { WeatherData } from './WeatherData';

@Injectable({
  providedIn: 'root'
})

export class WeatherService {
  
  // Inyectamos el servicio HttpClient de Angular.
  // Esto nos permite hacer llamadas HTTP a APIs externas, en este caso para pedir datos del clima.
  private http = inject(HttpClient);

  // Clave personal de la API de OpenWeatherMap (es necesario registrarse en openweathermap.org para obtener una).
  // NO se debería exponer nunca en producción.
  private readonly API_KEY = 'ba95a8a845ccb971b0e5cf1ea16be861';

  // URL base de la API de OpenWeatherMap para pedir el clima actual.
  // Le agregaremos parámetros según la ciudad y el idioma deseado en cada petición.
  private readonly BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

  // Signals reactivas para poder notificar cambios en la UI de Angular automáticamente.
  // weatherData guardará el resultado de la última consulta (o null si aún no hay datos).
  weatherData = signal<WeatherData | null>(null);

  // 'loading' indica si se está realizando en ese momento una petición HTTP.
  // Esto es útil para mostrar spinners o mensajes de "Cargando..." en la interfaz.
  loading = signal(false);

  // 'error' almacena cualquier error ocurrido durante la obtención de datos del clima.
  // Será mostrado al usuario si ocurre un problema, y es null cuando no hay error.
  error = signal<string | null>(null);

  /**
   * Obtiene el clima de cualquier ciudad llamando a la API de OpenWeatherMap.
   * 
   * @param cityName     - Nombre de la ciudad (ej: "Barcelona").
   * @param countryCode  - Código del país, por defecto "ES" (España), pero puede ser cualquiera compatible con OpenWeatherMap.
   * 
   * Lógica:
   * 1. Indica que estamos cargando (loading a true) y limpia errores previos.
   * 2. Construye los parámetros para la llamada HTTP:
   *    - 'q' = ciudad y país juntos (ej: "Barcelona,ES")
   *    - 'appid' = nuestra API_KEY de OpenWeatherMap
   *    - 'units' = "metric" para temperatura en Celsius
   *    - 'lang' = "es" para descripciones meteorológicas en español
   * 3. Realiza la petición HTTP GET usando Angular, espera un objeto que cumpla la interfaz WeatherData.
   * 4. Si sale bien:
   *    - Actualiza el signal weatherData con los nuevos datos.
   *    - Indica que ha terminado la carga (loading a false).
   * 5. Si sale mal:
   *    - Guarda el error en el signal para mostrarlo en la UI.
   *    - Indica que ha terminado la carga.
   */
  getCityWeather(cityName: string, countryCode: string = 'ES') {
    this.loading.set(true);        // Mostramos indicador de carga
    this.error.set(null);          // Limpiamos cualquier mensaje de error anterior

    // Parámetros construidos según la documentación de OpenWeatherMap
    const params = {
      q: `${cityName},${countryCode}`,
      appid: this.API_KEY,
      units: 'metric',
      lang: 'es'
    };

    // Realizamos la petición HTTP GET.
    this.http.get<WeatherData>(this.BASE_URL, { params }).subscribe({
      next: (data) => {
        // Si la respuesta es correcta, actualizamos el estado:
        this.weatherData.set(data); // Guardamos los datos meteorológicos recibidos
        this.loading.set(false);    // Ya no estamos cargando
      },
      error: (err) => {
        // Si ocurre algún problema (ciudad no encontrada, error de red, API caída, ...)
        // Guardamos el mensaje de error para que la UI lo muestre.
        this.error.set('Error al obtener el clima: ' + err.message);
        this.loading.set(false);    // Ya no estamos cargando
      }
    });
  }

}