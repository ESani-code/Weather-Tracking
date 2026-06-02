import {
  AirQualitySchema,
  GeoCode,
  WeatherSchema,
} from "./schema/weatherSchema";

export async function getWeather({ lat, lon }: { lat: number; lon: number }) {
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,uv_index_max,precipitation_sum,wind_speed_10m_max,visibility_mean,surface_pressure_mean,dew_point_2m_mean,sunrise,sunset&timezone=auto`,
    );
    const data = await res.json();
    return WeatherSchema.parse(data);
  } catch (error) {
    console.log(`Error: ${error}`);
    throw error;
  }
}

export async function geoCoding(location: string, count: number = 1) {
  try {
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=${count}`,
    );
    const data = await res.json();
    return GeoCode.parse(data.results[0]);
  } catch (error) {
    console.log(`Error: ${error}`);
    throw error;
  }
}

export async function airQuality({ lat, lon }: { lat: number; lon: number }) {
  try {
    const res = await fetch(
      `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=european_aqi,pm10,carbon_monoxide,pm2_5,nitrogen_dioxide,sulphur_dioxide,ozone`,
    );
    const data = await res.json();
    return AirQualitySchema.parse(data);
  } catch (e) {
    console.error(e);

    throw e;
  }
}
