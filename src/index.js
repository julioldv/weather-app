import "modern-normalize";
import "./styles.css";

const weatherResultContainer = document.querySelector("#weather-result");
const form = document.querySelector("#weather-form");
const locationInput = document.querySelector("#location");

const weatherClasses = [
  "weather-clear-day",
  "weather-clear-night",
  "weather-rain",
  "weather-snow",
  "weather-cloudy",
  "weather-partly-cloudy-day",
  "weather-partly-cloudy-night",
  "weather-fog",
  "weather-wind",
];

async function getWeatherData(location) {
  try {
    const safeLocation = encodeURIComponent(location);
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${safeLocation}?unitGroup=us&key=UM7FR7HW2RBCY3SJRXKCVMERM&contentType=json`,
    );
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
function processWeatherData(data) {
  return {
    location: data.resolvedAddress,
    temperature: data.days[0].temp,
    conditions: data.days[0].conditions,
    icon: data.days[0].icon,
  };
}

async function showWeatherForLocation(location) {
  weatherResultContainer.textContent = "Loading...";
  try {
    const rawWeatherData = await getWeatherData(location);
    const processedWeatherData = processWeatherData(rawWeatherData);

    renderWeatherData(processedWeatherData);
  } catch (error) {
    console.error(error);
    weatherResultContainer.innerHTML = "";
    const errorMessage = document.createElement("p");
    errorMessage.textContent =
      "Could not find that location. Please try again.";
    weatherResultContainer.append(errorMessage);
  }
}

function renderWeatherData(weatherData) {
  weatherResultContainer.innerHTML = "";
  updateWeatherTheme(weatherData.icon);

  const container = document.createElement("div");
  const locationTitle = document.createElement("h2");
  const temperatureDisplay = document.createElement("p");
  const conditionsDisplay = document.createElement("p");
  const unitToggleButton = document.createElement("button");

  container.classList.add("weather-card");
  temperatureDisplay.classList.add("temperature");

  unitToggleButton.textContent = "Show °C";

  locationTitle.textContent = weatherData.location;
  temperatureDisplay.textContent = `${weatherData.temperature} °F`;
  conditionsDisplay.textContent = weatherData.conditions;

  let isFahrenheit = true;

  unitToggleButton.addEventListener("click", () => {
    if (isFahrenheit) {
      temperatureDisplay.textContent = `${fahrenheitToCelsius(weatherData.temperature)} °C`;
      unitToggleButton.textContent = "Show °F";
      isFahrenheit = false;
    } else {
      temperatureDisplay.textContent = `${weatherData.temperature} °F`;
      unitToggleButton.textContent = "Show °C";
      isFahrenheit = true;
    }
  });

  container.append(
    locationTitle,
    temperatureDisplay,
    unitToggleButton,
    conditionsDisplay,
  );

  weatherResultContainer.append(container);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = locationInput.value.trim();
  if (location === "") return;
  showWeatherForLocation(location);
});

function fahrenheitToCelsius(fahrenheit) {
  return (((fahrenheit - 32) * 5) / 9).toFixed(1);
}

function updateWeatherTheme(icon) {
  document.body.classList.remove(...weatherClasses);
  document.body.classList.add(`weather-${icon}`);
}
