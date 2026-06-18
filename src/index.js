import "modern-normalize";
import "./styles.css";

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

async function displayTestWeatherData() {
  const rawWeatherData = await getWeatherData("Mexico City");
  const processedWeatherData = processWeatherData(rawWeatherData);

  console.log(processedWeatherData);
}

displayTestWeatherData();
