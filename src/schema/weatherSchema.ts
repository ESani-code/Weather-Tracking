import { z } from "zod";

export const weatherResponseSchema = z.object({
  coord: z.object({
    lon: z.number(),
    lat: z.number(),
  }),
  weather: z.array(
    z.object({
      id: z.number(),
      main: z.string(),
      description: z.string(),
      icon: z.string(),
    }),
  ),
  base: z.string(),
  main: z.object({
    temp: z.number(),
    feels_like: z.number(),
    temp_min: z.number(),
    temp_max: z.number(),
    pressure: z.number(),
    humidity: z.number(),
    // Note: sea_level and grnd_level are sometimes omitted by the API
    // for certain locations. You might want to append .optional() to these
    // if you fetch data for cities where this data isn't available.
    sea_level: z.number(),
    grnd_level: z.number(),
  }),
  visibility: z.number(),
  wind: z.object({
    speed: z.number(),
    deg: z.number(),
    // gust is also occasionally omitted by the API
    gust: z.number(),
  }),
  clouds: z.object({
    all: z.number(),
  }),
  dt: z.number(),
  sys: z.object({
    // country might be missing if the location is over an ocean
    country: z.string(),
    sunrise: z.number(),
    sunset: z.number(),
  }),
  timezone: z.number(),
  id: z.number(),
  name: z.string(),
  cod: z.number(),
});

// Extract the TypeScript type from the schema for use in your React components
export type WeatherResponse = z.infer<typeof weatherResponseSchema>;
