import "modern-normalize";
import "./styles.css";

const weatherResultContainer = document.querySelector("#weather-result");
const form = document.querySelector("#weather-form");
const locationInput = document.querySelector("#location");

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
  };
}

async function showWeatherForLocation(location) {
  weatherResultContainer.innerHTML = "";
  const rawWeatherData = await getWeatherData(location);
  const processedWeatherData = processWeatherData(rawWeatherData);

  renderWeatherData(processedWeatherData);
}

function renderWeatherData(processedWeatherData) {
  const container = document.createElement("div");
  const locationTitle = document.createElement("h2");
  const temperatureDisplay = document.createElement("p");
  const conditionsDisplay = document.createElement("p");

  locationTitle.textContent = processedWeatherData.location;
  temperatureDisplay.textContent = `${processedWeatherData.temperature} Fahrenheit`;
  conditionsDisplay.textContent = processedWeatherData.conditions;

  container.append(locationTitle, temperatureDisplay, conditionsDisplay);
  weatherResultContainer.append(container);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = locationInput.value.trim();
  if (location === "") return;
  showWeatherForLocation(location);
});
