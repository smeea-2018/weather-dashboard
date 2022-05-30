const renderCities = () => {
  // Get recent cities [] form LS
  //If empty render alert
  // else render recent cities
  //   Add event listener to div containing all cities
};

const renderWeatherData = (cityName) => {
  //Use API to fetch current weather data---
  //from the response put all data in an object
  //   get lat and long from weather data API response ....2nd API call
  //   const weatherForecastUrl =
  //render data
};

const renderCurrentWeather = (currentWeatherData) => {
  // render current weather data and append to the section
};

const renderForecastWeather = (forecastWeatherData) => {
  // render forecast weather data and append  each card to the section
};
const handleFormSubmit = () => {
  // get city name from input
  // if empty
  // render weather data
};

const getFromLocalStorage = (key, defaultValue) => {
  const dataFromLS = localStorage.getItem(key);

  const parsedData = JSON.stringify(dataFromLS);

  if (parsedData) {
    return parsedData;
  } else {
    return defaultValue;
  }
};
const onReady = () => {
  // render recent cities
  const recentSearchContainer = $("#recent-search");
  const recentSearches = getFromLocalStorage("recentSearches", []);
  if (recentSearches.length) {
  } else {
    const alert = `<div class="alert alert-info" role="alert">
          Data has not been found. Please enter the city.
        </div>`;
    recentSearchContainer.append(alert);
  }
};
// on load
$(document).ready(onReady);
