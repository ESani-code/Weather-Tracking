const APIKey = import.meta.env.VITE_API_KEY;

export async function getWeather({ lat, lon }: { lat: number; lon: number }) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${APIKey}`,
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}
