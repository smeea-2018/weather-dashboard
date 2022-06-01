const apikey = "96422e192460c3c4fca4e0c2b5ee0a5c";
// target html elements
const recentSearchContainer = $("#recent-search");
const searchForm = $("#city-search-form");
const weatherInfoContainer = $("#weather-info-container");
const removeAlert = $("#alert-ul");

// get data from LS
const getFromLocalStorage = (key, defaultValue) => {
  const dataFromLS = localStorage.getItem(key);

  const parsedData = JSON.parse(dataFromLS);

  if (parsedData) {
    console.log("parsedData", parsedData);
    return parsedData;
  } else {
    return defaultValue;
  }
};

// write to LS
const writeToLocalStorage = (key, value) => {
  const stringifiedValue = JSON.stringify(value);
  localStorage.setItem(key, stringifiedValue);
};

const constructUrl = (baseUrl, params) => {
  const queryParams = new URLSearchParams(params).toString();

  return queryParams ? `${baseUrl}?${queryParams}` : baseUrl;
};

const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const currentDataurl = constructUrl(
  " https://api.openweathermap.org/data/2.5/weather?",
  {
    q: "london",
    type: "8109f605d79877f7488a194794a29013",
  }
);

const renderCities = () => {
  // Get recent cities [] form LS
  const recentSearches = getFromLocalStorage("recentSearches", []);

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
    recentSearchContainer.empty();
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

const renderWeatherData = async (cityName) => {
  const currentDataUrl = constructUrl(
    "https://api.openweathermap.org/data/2.5/weather?",
    {
      q: "london",
      type: "8109f605d79877f7488a194794a29013",
    }
  );

  const currentData = await fetchData(currentDataUrl);
  //render lat , long and city Name
  const lat = currentData?.coord?.lat;
  const lon = currentData?.coord?.lon;
  const displayCity = currentData?.name;

  // forecast url
  const foreCastDataurl = constructUrl(
    " https://api.openweathermap.org/data/2.5/onecall",
    {
      lat: lat,
      lon: lon,
      exclude: "minutely, hourly",
      units: "metric",
      type: "8109f605d79877f7488a194794a29013",
    }
  );

  const forecastData = await fetchData(foreCastDataurl);
  //Use API to fetch current weather data---
  //from the response put all data in an object
  //   get lat and long from weather data API response ....2nd API call
  //   const weatherForecastUrl =
  //render data
  return {
    cityName: displayCity,
    weatherData: forecastData,
  };
};
const renderCurrentData = (currentData) => {
  const currentWeatherCard = `<div class="current-weather">
            <h2>
              ${currentData.cityName}
              <img
                class="bg-light border rounded"
                src="http://openweathermap.org/img/w/.png"
                alt="weather icon"
              />
            </h2>
            <div class="row g-0">
              <div class="col-sm-12 col-md-4 p-2">Temp:</div>
              <div class="col-sm-12 col-md-8 p-2">${data.weatherData.current.temp}&deg;c</div>
            </div>
            <div class="row g-0">
              <div class="col-sm-12 col-md-4 p-2">Wind:</div>
              <div class="col-sm-12 col-md-8 p-2">${data.weatherData.current.wind_speed} MPH</div>
            </div>
            <div class="row g-0">
              <div class="col-sm-12 col-md-4 p-2">Humidity:</div>
              <div class="col-sm-12 col-md-8 p-2">${data.weatherData.current.humidity}&percent;</div>
            </div>
            <div class="row g-0">
              <div class="col-sm-12 col-md-4 p-2">UV Index:</div>

              <div class="col-sm-12 col-md-8 p-2">
                <span class="bg-success text-white rounded-2"> ${data.weatherData.current.uvi}</span>
              </div>
            </div>
          </div>`;
  weatherInfoContainer.append(currentWeatherCard);
};

const renderForecastData = (weatherData) => {
  const createForecastCard = () => {};
  const forecastCard = data.weatherData.daily.map(createForecastCard);
  const forecastWeatherCard = `<div>
            <h4 class="my-3 fw-bold">5-day Forecast:</h4>
            <div class="d-flex flex-wrap justify-content-between">
              <!-- div for first card -->
              <div class="card" style="width: 12rem">
                <img
                  class="card-img-top card-image"
                  src="http://openweathermap.org/img/w/04d.png"
                  alt="Card image cap"
                />

                <div class="card-body">
                  <h5 class="card-title">${moment
                    .unix(value)
                    .format("MM/DD/YYYY")}</h5>
                  <p class="card-text">Temp:</p>
                  <p class="card-text">Wind:</p>
                  <p class="card-text">Humidity</p>
                </div>
              </div>
              <!--  div for second card-->
              <div class="card" style="width: 12rem">
                <img
                  class="card-img-top card-image"
                  src="http://openweathermap.org/img/w/04d.png"
                  alt="Card image cap"
                />
                <div class="card-body">
                  <h5 class="card-title">01/06/2022</h5>
                  <p class="card-text">Temp:</p>
                  <p class="card-text">Wind:</p>
                  <p class="card-text">Humidity</p>
                </div>
              </div>
              <!--  div for 3rd card -->
              <div class="card" style="width: 12rem">
                <img
                  class="card-img-top card-image"
                  src="http://openweathermap.org/img/w/04d.png"
                  alt="Card image cap"
                />
                <div class="card-body">
                  <h5 class="card-title">02/06/2022</h5>
                  <p class="card-text">Temp:</p>
                  <p class="card-text">Wind:</p>
                  <p class="card-text">Humidity</p>
                </div>
              </div>
              <!-- div for 4th card -->
              <div class="card" style="width: 12rem">
                <img
                  class="card-img-top card-image"
                  src="http://openweathermap.org/img/w/04d.png"
                  alt="Card
              image cap"
                />
                <div class="card-body">
                  <h5 class="card-title">03/06/2022</h5>
                  <p class="card-text">Temp:</p>
                  <p class="card-text">Wind:</p>
                  <p class="card-text">Humidity</p>
                </div>
              </div>
              <!-- div for 5th card-->
              <div class="card" style="width: 12rem">
                <img
                  class="card-img-top card-image"
                  src="http://openweathermap.org/img/w/04d.png"
                  alt="Card image cap"
                />
                <div class="card-body">
                  <h5 class="card-title">04/06/2022</h5>
                  <p class="card-text">Temp:</p>
                  <p class="card-text">Wind:</p>
                  <p class="card-text">Humidity</p>
                </div>
              </div>
              <!-- card div ends here -->
            </div>
            <!--closing div for flex class-->
          </div>`;
  weatherInfoContainer.append(forecastWeatherCard);
};

const renderCurrentWeather = (currentWeatherData) => {
  // render current weather data and append to the section
};

const renderForecastWeather = (forecastWeatherData) => {
  // render forecast weather data and append  each card to the section
};
const handleFormSubmit = async (event) => {
  event.preventDefault();

  // get city name from input
  const cityName = $("#city-name").val();

  // if  not empty
  if (cityName) {
    const weatherData = await renderWeatherData(cityName);
    // render current data dynamically
    renderCurrentData(weatherData);

    // render forecast data via jquery
    renderForecastData(weatherData);

    const recentSearches = getFromLocalStorage("recentSearches", []);

    if (!recentSearches.includes(cityName)) {
      recentSearches.push(cityName);
    }
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
