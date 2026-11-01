const citySelect = document.getElementById("city-select");
const getWeatherBtn = document.getElementById("get-weather-btn");
const weatherCard = document.getElementById("weather-card");

const weatherIcon = document.getElementById("weather-icon");
const mainTemperature = document.getElementById("main-temperature");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const windGust = document.getElementById("wind-gust");
const weatherMain = document.getElementById("weather-main");
const locationEl = document.getElementById("location");

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://weather-proxy.freecodecamp.rocks/api/city/${city}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

function withUnit(value, unit) {
  return value === undefined ? "N/A" : `${value} ${unit}`;
}

async function showWeather(city) {
  const data = await getWeather(city);

  if (!data) {
    alert("Something went wrong, please try again later");
    return;
  }

  const current = data.weather?.[0] ?? {};
  const main = data.main ?? {};
  const windData = data.wind ?? {};

  weatherIcon.src = current.icon ?? "";
  weatherIcon.alt = current.description ?? "Weather icon";
  mainTemperature.textContent = withUnit(main.temp, "°C");
  feelsLike.textContent = withUnit(main.feels_like, "°C");
  humidity.textContent = withUnit(main.humidity, "%");
  wind.textContent = withUnit(windData.speed, "m/s");
  windGust.textContent = withUnit(windData.gust, "m/s");
  weatherMain.textContent = current.main ?? "N/A";
  locationEl.textContent = data.name ?? "N/A";

  weatherCard.classList.remove("hidden");
}

getWeatherBtn.addEventListener("click", () => {
  const city = citySelect.value;
  if (!city) return;
  showWeather(city);
});