import { WeatherSchema } from "./schema/weatherSchema";
// const APIKey = import.meta.env.VITE_API_KEY;

export async function getWeather({ lat, lon }: { lat: number; lon: number }) {
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,uv_index_max,precipitation_sum,wind_speed_10m_max&timezone=auto`,
    );
    const data = await res.json();
    return WeatherSchema.parse(data);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}
