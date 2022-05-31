// target html elements
const recentSearchContainer = $("#recent-search");
const searchForm = $("#city-search-form");
const weatherInfoContainer = $("#weather-info-container");
const removeAlert = $("#alert-ul");

// get data from LS
const getFromLocalStorage = (key, defaultValue) => {
  const dataFromLS = localStorage.getItem(key);

  const parsedData = JSON.stringify(dataFromLS);

  if (parsedData) {
    return parsedData;
  } else {
    return defaultValue;
  }
};

// write to LS
const writeToLocalStorage = (key, value) => {
  const stringifiedValue = JSON.stringify(value);
  localStorage.setItem(stringifiedValue);
};
const renderCities = () => {
  // Get recent cities [] form LS
  //const recentSearches = getFromLocalStorage("recentSearches", []);

  const recentSearches = ["london", "leeds"];
  console.log(recentSearches);
  console.log(recentSearches.length);
  //If past search exists render cities
  if (recentSearches.length) {
    const createRecentCity = (city) => {
      return `<li class="list-group-item" data-city="${city}">
          ${city}
        </li>`;
    };
    const recentCities = recentSearches.map(createRecentCity).join("");
    console.log(recentCities);
    const ul = `<ul class="list-group">
            ${recentCities}
          </ul>`;
    recentSearchContainer.append(ul);
  }
  // else render alert
  else {
    const alert = `<div class="alert alert-info" role="alert" id = "alert-ul">
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
const renderCurrentData = () => {
  console.log("hello");
  const currentWeatherCard = `<div class="current-weather">
            <h2>
              Birmingham 20/05/2022 weather icon
              <img
                class="bg-light border rounded"
                src="http://openweathermap.org/img/w/04d.png"
                alt="weather icon"
              />
            </h2>
            <div class="row g-0">
              <div class="col-sm-12 col-md-4 p-2">Temp:</div>
              <div class="col-sm-12 col-md-8 p-2">16&deg;c</div>
            </div>
            <div class="row g-0">
              <div class="col-sm-12 col-md-4 p-2">Wind:</div>
              <div class="col-sm-12 col-md-8 p-2">10 MPH</div>
            </div>
            <div class="row g-0">
              <div class="col-sm-12 col-md-4 p-2">Humidity:</div>
              <div class="col-sm-12 col-md-8 p-2">0&percnt;</div>
            </div>
            <div class="row g-0">
              <div class="col-sm-12 col-md-4 p-2">UV Index:</div>

              <div class="col-sm-12 col-md-8 p-2">
                <span class="bg-success text-white rounded-2"> 1.5</span>
              </div>
            </div>
          </div>`;
  weatherInfoContainer.append(currentWeatherCard);
};

const renderCurrentWeather = (currentWeatherData) => {
  // render current weather data and append to the section
};

const renderForecastWeather = (forecastWeatherData) => {
  // render forecast weather data and append  each card to the section
};
const handleFormSubmit = (event) => {
  event.preventDefault();
  console.log("hello");
  // get city name from input
  const cityName = $("#city-name").val();
  console.log(cityName);
  // if  not empty
  if (cityName) {
    renderCurrentData();
    const recentSearches = getFromLocalStorage("recentSearches", []);
    recentSearches.push(cityName);
    writeToLocalStorage("recentSearches", recentSearches);
    // remove last section
    removeAlert.remove();
    //recentSearchContainer.children().last().remove();
    // rerender recent cities
    renderCities();
  }
  // render weather data
};

const handleSearchClick = (event) => {
  const target = $(event.target);

  if (target.is("li")) {
    const cityName = target.attr("data-city");
  }
};

const onReady = () => {
  // render recent cities
  renderCities();
};
recentSearchContainer.click(handleSearchClick);

searchForm.submit(handleFormSubmit);
// on load
$(document).ready(onReady);
