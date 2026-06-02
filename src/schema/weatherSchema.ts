import { z } from "zod";

export const WeatherSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  generationtime_ms: z.number(),
  utc_offset_seconds: z.number(),
  timezone: z.string(),
  timezone_abbreviation: z.string(),
  elevation: z.number(),

  current_units: z.object({
    time: z.string(),
    interval: z.string(),
    temperature_2m: z.string(),
    relative_humidity_2m: z.string(),
    apparent_temperature: z.string(),
    is_day: z.string(),
    precipitation: z.string(),
    weather_code: z.string(),
    wind_speed_10m: z.string(),
    wind_direction_10m: z.string(),
  }),

  current: z.object({
    time: z.string(),
    interval: z.number(),
    temperature_2m: z.number(),
    relative_humidity_2m: z.number(),
    apparent_temperature: z.number(),
    is_day: z.number(),
    precipitation: z.number(),
    weather_code: z.number(),
    wind_speed_10m: z.number(),
    wind_direction_10m: z.number(),
  }),

  hourly_units: z.object({
    time: z.string(),
    temperature_2m: z.string(),
    relative_humidity_2m: z.string(),
    precipitation_probability: z.string(),
    weather_code: z.string(),
    wind_speed_10m: z.string(),
  }),

  hourly: z.object({
    time: z.array(z.string()),
    temperature_2m: z.array(z.number()),
    relative_humidity_2m: z.array(z.number()),
    precipitation_probability: z.array(z.number()),
    weather_code: z.array(z.number()),
    wind_speed_10m: z.array(z.number()),
  }),

  daily_units: z.object({
    time: z.string(),
    weather_code: z.string(),
    temperature_2m_max: z.string(),
    temperature_2m_min: z.string(),
    apparent_temperature_max: z.string(),
    apparent_temperature_min: z.string(),
    uv_index_max: z.string(),
    precipitation_sum: z.string(),
    wind_speed_10m_max: z.string(),
  }),

  daily: z.object({
    time: z.array(z.string()),
    weather_code: z.array(z.number()),
    temperature_2m_max: z.array(z.number()),
    temperature_2m_min: z.array(z.number()),
    apparent_temperature_max: z.array(z.number()),
    apparent_temperature_min: z.array(z.number()),
    uv_index_max: z.array(z.number()),
    precipitation_sum: z.array(z.number()),
    wind_speed_10m_max: z.array(z.number()),
    visibility_mean: z.array(z.number()),
    surface_pressure_mean: z.array(z.number()),
    dew_point_2m_mean: z.array(z.number()),
    sunrise: z.array(z.string()),
    sunset: z.array(z.string()),
  }),
});

export const GeoCode = z.object({
  id: z.number(),
  name: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  elevation: z.number().optional(),
  feature_code: z.string().optional(),
  country_code: z.string().optional(),
  timezone: z.string().optional(),
  population: z.number().optional(),
  postcodes: z.array(z.string()).optional(),
  country_id: z.number().optional(),
  country: z.string().optional(),

  // Administrative boundaries are highly variable depending on the country,
  // so they must be marked as optional.
  admin1_id: z.number().optional(),
  admin2_id: z.number().optional(),
  admin3_id: z.number().optional(),
  admin4_id: z.number().optional(),
  admin1: z.string().optional(),
  admin2: z.string().optional(),
  admin3: z.string().optional(),
  admin4: z.string().optional(),
});

export const AirQualitySchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  generationtime_ms: z.number(),
  utc_offset_seconds: z.number(),
  timezone: z.string(),
  timezone_abbreviation: z.string(),
  elevation: z.number(),
  current_units: z.object({
    time: z.string(),
    interval: z.string(),
    european_aqi: z.string(),
    pm10: z.string(),
    carbon_monoxide: z.string(),
    pm2_5: z.string(),
    nitrogen_dioxide: z.string(),
    sulphur_dioxide: z.string(),
    ozone: z.string(),
  }),
  current: z.object({
    time: z.string(),
    interval: z.number(),
    european_aqi: z.number(),
    pm10: z.number(),
    carbon_monoxide: z.number(),
    pm2_5: z.number(),
    nitrogen_dioxide: z.number(),
    sulphur_dioxide: z.number(),
    ozone: z.number(),
  }),
});

// Extract the TypeScript type from the schema for use in your components
export type AirQualityData = z.infer<typeof AirQualitySchema>;
export type WeatherData = z.infer<typeof WeatherSchema>;
export type GeoCodeData = z.infer<typeof GeoCode>;
