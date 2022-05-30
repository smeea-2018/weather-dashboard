const recentSearchContainer = $("#recent-search");
const renderCities = () => {
  // Get recent cities [] form LS
  const recentSearches = getFromLocalStorage("recentSearches", []);
  recentSearches = ["london"];
  //If past search exists render cities
  if (recentSearches.length) {
    const createRecentCity = (city) => {
      return `<li class="list-group-item" data-city="${city}">
          ${city}
        </li>`;
    };
    const recentCities = recentSearches.map(createRecentCity).join("");
    const ul = `<ul class="list-group">
            ${recentCities}
          </ul>`;
    recentSearchContainer.append(ul);
  }
  // else render alert
  else {
    const alert = `<div class="alert alert-info" role="alert">
          Data has not been found. Please enter the city.
        </div>`;
    recentSearchContainer.append(alert);
  }
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
  renderCities();
};
const handleSearchClick = (event) => {
  const target = $(event.target);

  if (target.is("li")) {
    const cityName = target.attr("data-city");
  }
};

recentSearchContainer.click(handleSearchClick);
// on load
$(document).ready(onReady);
